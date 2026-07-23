import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { authenticateApiKey } from "@/lib/apiKeyAuth";
import { getBatchPayoutContract, BATCH_PAYOUT_ADDRESS } from "@/lib/web3/contracts";
import { getServerReadProvider } from "@/lib/web3/activity";
import { ARC_TESTNET_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";

// Public developer API — builds (but does not sign or send) a batch payout
// transaction. FinFlow is non-custodial: this backend has no private key to
// send funds on a caller's behalf, so it returns unsigned calldata for the
// caller's own wallet/backend to sign, mirroring how most non-custodial
// wallet-as-a-service APIs work.
export async function POST(req: NextRequest) {
  const owner = await authenticateApiKey(req);
  if (!owner) return NextResponse.json({ error: "Invalid or missing API key" }, { status: 401 });
  if (!BATCH_PAYOUT_ADDRESS) return NextResponse.json({ error: "BatchPayout contract not deployed" }, { status: 503 });

  const { recipients } = await req.json().catch(() => ({ recipients: [] }));
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return NextResponse.json({ error: "Missing 'recipients': [{address, amount}]" }, { status: 400 });
  }
  if (recipients.length > 200) return NextResponse.json({ error: "Max 200 recipients per batch" }, { status: 400 });

  try {
    const addresses = recipients.map((r: { address: string }) => r.address);
    const amounts = recipients.map((r: { amount: string | number }) => ethers.parseUnits(String(r.amount), 18));
    for (const a of addresses) {
      if (!/^0x[a-fA-F0-9]{40}$/.test(a)) throw new Error(`Invalid address: ${a}`);
    }

    const contract = getBatchPayoutContract(getServerReadProvider());
    const [total, fee, valueToSend] = await contract.quote(amounts);
    const data = contract.interface.encodeFunctionData("disperseNative", [addresses, amounts]);

    return NextResponse.json({
      to: BATCH_PAYOUT_ADDRESS,
      data,
      value: valueToSend.toString(),
      chainId: ARC_TESTNET_CHAIN_ID_DECIMAL,
      quote: { totalToRecipients: total.toString(), fee: fee.toString(), valueToSend: valueToSend.toString() },
      note: "Sign and send this transaction yourself — FinFlow never holds your private key.",
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
