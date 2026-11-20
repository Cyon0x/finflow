const assert = require("node:assert/strict");
const { randomBytes, createHash } = require("node:crypto");
const { ethers } = require("ethers");
require("dotenv").config({ quiet: true });
require("dotenv").config({ path: ".env.local", override: true, quiet: true });
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const manifest = require("../deployments/arc-mainnet.json");
const origin = process.argv[2] || "http://localhost:3142";
const wallet = ethers.Wallet.createRandom();
const owner = wallet.address.toLowerCase();
const passed = [];

async function auth(chainId = 5042) {
  const timestamp = Date.now();
  const message = `FinFlow API request\nchainId:${chainId}\naddress:${owner}\ntimestamp:${timestamp}`;
  return { address: wallet.address, timestamp, signature: await wallet.signMessage(message) };
}

async function request(path, body, headers = {}) {
  const response = await fetch(`${origin}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  return { status: response.status, data: await response.json() };
}

async function authedGet(path, chainId = 5042) {
  const query = new URLSearchParams(await auth(chainId));
  return request(`${path}?${query}`);
}

async function checkDatabaseIds(modelName, idField, historicalId, required) {
  if (historicalId === null) return;
  let rolledBack = false;
  try {
    await db.$transaction(async (tx) => {
      const data = { ...required, ownerAddress: owner, chainId: 5042, [idField]: historicalId };
      await tx[modelName].create({ data });
      // A matching mainnet ID is allowed, but the same ID twice on mainnet
      // must be rejected. This rejection rolls both writes back.
      await tx[modelName].create({ data });
    }, { timeout: 20_000 });
  } catch (error) {
    if (error.code !== "P2002") throw error;
    rolledBack = true;
  }
  assert.equal(rolledBack, true, `${modelName} must enforce uniqueness within a network`);
  assert.equal(await db[modelName].count({ where: { ownerAddress: owner } }), 0, "Test transaction must roll back");
  passed.push(`${modelName}: IDs can repeat across networks, and remain unique within one network`);
}

async function main() {
  const network = await request("/api/network");
  assert.equal(network.status, 200);
  assert.equal(network.data.chainId, 5042);
  assert.equal(network.data.network, "mainnet");
  assert.equal(network.data.rpcUrl, "https://rpc.mainnet.arc.io");
  assert.equal(network.data.nativeCurrency.decimals, 18);
  assert.equal(network.data.contracts.treasury, manifest.contracts.FinFlowTreasury.address);
  assert.equal(network.data.contracts.escrow, manifest.contracts.FinFlowEscrow.address);
  assert.equal(network.data.contracts.batchPayout, manifest.contracts.FinFlowBatchPayout.address);
  passed.push("App exposes the confirmed Arc Mainnet configuration");

  const oldInvoice = await db.invoice.findFirst({ where: { chainId: 5042002, chainInvoiceId: { not: null } }, select: { id: true, chainInvoiceId: true } });
  const oldEscrow = await db.escrowRecord.findFirst({ where: { chainId: 5042002 }, select: { id: true, chainEscrowId: true } });
  const oldLink = await db.paymentLink.findFirst({ where: { chainId: 5042002 }, select: { slug: true } });
  const future = new Date(Date.now() + 86400_000);
  if (oldInvoice) await checkDatabaseIds("invoice", "chainInvoiceId", oldInvoice.chainInvoiceId, { clientName: "Network regression check", description: "Temporary, rolled back", amountNative: "1", dueDate: future });
  if (oldEscrow) await checkDatabaseIds("escrowRecord", "chainEscrowId", oldEscrow.chainEscrowId, { contractor: owner, amountNative: "1", milestone: "Temporary, rolled back", deadline: future });

  assert.equal((await authedGet("/api/invoices", 5042002)).status, 401);
  passed.push("Testnet wallet signatures cannot authorize mainnet requests");
  for (const [path, field] of [["/api/invoices", "invoices"], ["/api/escrows", "escrows"], ["/api/payouts", "payouts"], ["/api/payment-links", "links"]]) {
    const result = await authedGet(path);
    assert.equal(result.status, 200);
    assert.deepEqual(result.data[field], []);
  }
  passed.push("Mainnet resource endpoints require a mainnet signature and return network-scoped data");
  if (oldLink) assert.equal((await request(`/api/payment-links/${oldLink.slug}`)).status, 404);
  if (oldInvoice) assert.equal((await request(`/api/invoices/${oldInvoice.id}/sync`, {})).status, 404);
  if (oldEscrow) assert.equal((await request(`/api/escrows/${oldEscrow.id}/sync`, {})).status, 404);
  passed.push("Archived testnet links and synchronization requests cannot use mainnet contracts");

  const signed = await auth();
  assert.equal((await request("/api/keys", { auth: signed, env: "TEST" })).status, 400);
  const live = await request("/api/keys", { auth: signed, env: "LIVE", label: "Temporary network regression check" });
  assert.equal(live.status, 201);
  assert.equal(live.data.env, "LIVE");
  assert.equal(typeof live.data.key, "string");
  const bearer = { Authorization: `Bearer ${live.data.key}` };
  passed.push("Mainnet issues live keys and rejects test-key creation");

  const oldSecret = `ff_live_qa_${randomBytes(24).toString("hex")}`;
  await db.apiKey.create({ data: { ownerAddress: owner, chainId: 5042002, env: "LIVE", label: "Temporary archived-key check", keyPrefix: "ff_live_qa", keyHash: createHash("sha256").update(oldSecret).digest("hex") } });
  const payoutRequest = { recipients: [{ address: manifest.deployer, amount: "1" }] };
  assert.equal((await request("/api/v1/payouts/batch", payoutRequest, { Authorization: `Bearer ${oldSecret}` })).status, 401);
  passed.push("Keys created on testnet cannot authorize mainnet payouts");

  const payout = await request("/api/v1/payouts/batch", payoutRequest, bearer);
  assert.equal(payout.status, 200);
  assert.equal(payout.data.chainId, 5042);
  assert.equal(payout.data.to, manifest.contracts.FinFlowBatchPayout.address);
  assert.equal(payout.data.value, ethers.parseEther("1.01").toString());
  assert.equal(BigInt(payout.data.maxFeePerGas) >= ethers.parseUnits("20", "gwei"), true);
  const iface = new ethers.Interface(["function disperseNative(address[] recipients,uint256[] amounts)"]);
  const decoded = iface.decodeFunctionData("disperseNative", payout.data.data);
  assert.equal(decoded.amounts[0], ethers.parseEther("1"));
  passed.push("Unsigned payout API uses the mainnet contract, native 18-decimal USDC, real fee quote and Arc gas floor");

  const created = await request("/api/v1/payment-links", { title: "Temporary network regression check" }, bearer);
  assert.equal(created.status, 201);
  assert.equal(created.data.chainId, 5042);
  const link = await request(`/api/payment-links/${created.data.slug}`);
  assert.equal(link.status, 200);
  assert.equal(link.data.link.chainId, 5042);
  assert.equal(link.data.link.type, "OPEN");
  passed.push("Live API payment links are created and served on mainnet");

  const invalidHash = `0x${"0".repeat(64)}`;
  assert.equal((await request("/api/invoices", { auth: signed, clientName: "QA", description: "QA", amountNative: "1", dueDate: future.toISOString(), chainInvoiceId: 1, txHashCreate: invalidHash })).status, 400);
  assert.equal((await request("/api/escrows", { auth: signed, contractor: owner, amountNative: "1", milestone: "QA", deadline: future.toISOString(), chainEscrowId: 1, txHashCreate: invalidHash })).status, 400);
  assert.equal((await request("/api/payouts", { auth: signed, txHash: invalidHash, recipientCount: 1, totalNative: "1", feeNative: "0" })).status, 400);
  passed.push("Invoice, escrow and payout recording reject unconfirmed transactions");
  console.log(JSON.stringify({ passed: passed.length, checks: passed, financialTransactionsSent: 0 }, null, 2));
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(async () => {
  // Only the fresh, unfunded regression-test wallet is touched by cleanup.
  await db.$transaction([
    db.paymentLink.deleteMany({ where: { ownerAddress: owner } }),
    db.apiKey.deleteMany({ where: { ownerAddress: owner } }),
  ]);
  await db.$disconnect();
});
