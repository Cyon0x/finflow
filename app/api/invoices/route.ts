import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { ARC_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";
import { getServerReadProvider, getInvoiceOnChain, getTreasuryContract } from "@/lib/web3/activity";
import { TREASURY_ADDRESS } from "@/lib/web3/contracts";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    where: { ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL },
    orderBy: { createdAt: "desc" },
    include: { paymentLink: { select: { slug: true } } },
  });
  return NextResponse.json({ invoices });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { businessName, clientName, clientEmail, description, amountNative, dueDate, chainInvoiceId, txHashCreate } = body;
  if (!clientName || !description || !amountNative || !dueDate || !chainInvoiceId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!Number.isSafeInteger(Number(chainInvoiceId)) || Number(chainInvoiceId) < 1 || !/^\d+$/.test(String(amountNative)) || BigInt(amountNative) <= 0n || !/^0x[\da-fA-F]{64}$/.test(txHashCreate || "") || !Number.isFinite(new Date(dueDate).getTime())) {
    return NextResponse.json({ error: "Invalid invoice details" }, { status: 400 });
  }
  let onChain;
  try {
    const provider = getServerReadProvider();
    const [invoiceState, receipt] = await Promise.all([getInvoiceOnChain(provider, Number(chainInvoiceId)), provider.getTransactionReceipt(txHashCreate)]);
    const treasury = getTreasuryContract(provider);
    const created = receipt?.logs.some((log) => {
      if (log.address.toLowerCase() !== TREASURY_ADDRESS.toLowerCase()) return false;
      try { const event = treasury.interface.parseLog(log); return event?.name === "InvoiceCreated" && Number(event.args.id) === Number(chainInvoiceId); } catch { return false; }
    });
    if (!invoiceState || invoiceState.merchant.toLowerCase() !== owner || invoiceState.amountWei !== BigInt(amountNative) || receipt?.status !== 1 || !created) {
      return NextResponse.json({ error: "Invoice must match a confirmed transaction from your wallet on this network" }, { status: 400 });
    }
    onChain = invoiceState;
  } catch {
    return NextResponse.json({ error: "Unable to verify the invoice on Arc. Please try again." }, { status: 503 });
  }

  const invoice = await prisma.invoice.create({
    data: {
      ownerAddress: owner,
      chainId: ARC_CHAIN_ID_DECIMAL,
      businessName: businessName || null,
      clientName,
      clientEmail: clientEmail || null,
      description,
      amountNative: String(amountNative),
      dueDate: new Date(dueDate),
      chainInvoiceId: Number(chainInvoiceId),
      txHashCreate: txHashCreate || null,
      status: onChain.paid ? "PAID" : "PENDING",
      payerAddress: onChain.paid ? onChain.payer.toLowerCase() : null,
    },
  });

  return NextResponse.json({ invoice }, { status: 201 });
}
