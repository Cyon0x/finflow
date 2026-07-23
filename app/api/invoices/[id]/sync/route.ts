import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerReadProvider, getInvoiceOnChain } from "@/lib/web3/activity";

// Re-reads the real on-chain invoice state and reconciles the DB row.
// Deliberately takes no client-asserted "it's paid" claim — the payer (who
// may not be the invoice owner) has no write access to this row, so the
// only way to mark PAID is to verify it directly against the contract.
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!invoice.chainInvoiceId) return NextResponse.json({ error: "Invoice has no on-chain id yet" }, { status: 400 });

  const onChain = await getInvoiceOnChain(getServerReadProvider(), invoice.chainInvoiceId);
  if (!onChain) return NextResponse.json({ error: "Invoice not found on-chain" }, { status: 404 });

  const updated = await prisma.invoice.update({
    where: { id: invoice.id },
    data: onChain.paid
      ? { status: "PAID", payerAddress: onChain.payer }
      : invoice.dueDate < new Date()
        ? { status: "OVERDUE" }
        : {},
  });

  return NextResponse.json({ invoice: updated, onChain: { paid: onChain.paid, payer: onChain.payer } });
}
