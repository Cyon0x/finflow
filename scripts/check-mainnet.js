const { ethers } = require("ethers");
const fs = require("node:fs");
const path = require("node:path");
const config = require("../config/arc-networks.json").mainnet;
const manifest = require("../deployments/arc-mainnet.json");

async function main() {
  const provider = new ethers.JsonRpcProvider(config.rpcUrl, { chainId: config.chainId, name: "arc-mainnet" });
  if ((await provider.getNetwork()).chainId !== 5042n) throw new Error("RPC is not Arc Mainnet");
  const sources = { FinFlowTreasury: "reference/FinFlowTreasury.sol", FinFlowEscrow: "Escrow.sol", FinFlowBatchPayout: "BatchPayout.sol" };
  const checks = {};
  let gasCost = 0n;
  for (const [name, record] of Object.entries(manifest.contracts)) {
    const artifact = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "artifacts", "contracts", sources[name], `${name}.json`), "utf8"));
    const receipt = await provider.getTransactionReceipt(record.transactionHash);
    const transaction = await provider.getTransaction(record.transactionHash);
    if (!receipt || receipt.status !== 1 || receipt.contractAddress !== record.address || receipt.blockNumber !== record.blockNumber) throw new Error(`${name}: invalid deployment receipt`);
    if (!transaction || transaction.chainId !== 5042n || transaction.from !== manifest.deployer) throw new Error(`${name}: wrong deployment chain or sender`);
    const code = await provider.getCode(record.address);
    if (code.toLowerCase() !== artifact.deployedBytecode.toLowerCase()) throw new Error(`${name}: bytecode mismatch`);
    const contract = new ethers.Contract(record.address, artifact.abi, provider);
    const owner = await contract.owner();
    if (owner !== manifest.deployer) throw new Error(`${name}: owner mismatch`);
    checks[name] = { address: record.address, transactionHash: record.transactionHash, blockNumber: record.blockNumber, owner, bytecodeMatches: true };
    if (name !== "FinFlowTreasury") {
      const feeCollector = await contract.feeCollector();
      if (feeCollector !== manifest.deployer) throw new Error(`${name}: fee collector mismatch`);
      checks[name].feeCollector = feeCollector;
      checks[name].feeBps = Number(await contract.feeBps());
    }
    gasCost += receipt.gasUsed * receipt.gasPrice;
  }
  console.log(JSON.stringify({ network: config.chainName, chainId: config.chainId, deployer: manifest.deployer, gasCostUsdc: ethers.formatEther(gasCost), remainingBalanceUsdc: ethers.formatEther(await provider.getBalance(manifest.deployer)), checks }, null, 2));
  provider.destroy();
}

main().catch((error) => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
