import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerReadProvider, getInvoiceOnChain, getEscrowOnChain } from "@/lib/web3/activity";
import { weiToUsdc } from "@/lib/web3/format";

// Daily reconciliation pass (Vercel Hobby plan caps cron at once/day — see
// vercel.json). This is a backstop, not the primary data path: when a user
// creates/pays an invoice or releases an escrow through the app, the client
// writes the result to the DB immediately after the transaction confirms.
// This job exists to catch anything that happened outside the app (direct
// contract calls, a client tab closed before the confirm write landed) and
// to fire webhooks for state changes.
//
// Deliberately does NOT scan the full event-log history on every run — it
// only re-checks rows already marked pending, which is O(pending rows) RPC
// calls instead of O(blocks). See lib/web3/activity.ts for the one-time
// historical backfill path (scripts/backfill-events.js).

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = getServerReadProvider();
  const results = { invoicesChecked: 0, invoicesUpdated: 0, escrowsChecked: 0, escrowsUpdated: 0, errors: [] as string[] };

  const pendingInvoices = await prisma.invoice.findMany({
    where: { status: "PENDING", chainInvoiceId: { not: null } },
    take: 200,
  });

  for (const inv of pendingInvoices) {
    results.invoicesChecked++;
    try {
      const onChain = await getInvoiceOnChain(provider, inv.chainInvoiceId!);
      if (onChain?.paid) {
        await prisma.invoice.update({
          where: { id: inv.id },
          data: { status: "PAID", payerAddress: onChain.payer },
        });
        results.invoicesUpdated++;
        await fireWebhooks(inv.ownerAddress, "invoice.paid", {
          invoiceId: inv.id,
          chainInvoiceId: inv.chainInvoiceId,
          amountUsdc: weiToUsdc(onChain.amountWei),
          payer: onChain.payer,
        });
      } else if (inv.dueDate < new Date()) {
        await prisma.invoice.update({ where: { id: inv.id }, data: { status: "OVERDUE" } });
        results.invoicesUpdated++;
      }
    } catch (e) {
      results.errors.push(`invoice ${inv.id}: ${(e as Error).message}`);
    }
  }

  const pendingEscrows = await prisma.escrowRecord.findMany({
    where: { released: false },
    take: 200,
  });

  for (const esc of pendingEscrows) {
    results.escrowsChecked++;
    try {
      const onChain = await getEscrowOnChain(provider, esc.chainEscrowId);
      if (onChain?.released) {
        await prisma.escrowRecord.update({ where: { id: esc.id }, data: { released: true } });
        results.escrowsUpdated++;
        await fireWebhooks(esc.ownerAddress, "escrow.released", {
          escrowId: esc.id,
          chainEscrowId: esc.chainEscrowId,
          amountUsdc: weiToUsdc(onChain.amountWei),
        });
      }
    } catch (e) {
      results.errors.push(`escrow ${esc.id}: ${(e as Error).message}`);
    }
  }

  return NextResponse.json(results);
}

async function fireWebhooks(ownerAddress: string, event: string, payload: Record<string, unknown>) {
  const webhooks = await prisma.webhook.findMany({ where: { ownerAddress } });
  await Promise.allSettled(
    webhooks.map((wh) =>
      fetch(wh.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-FinFlow-Secret": wh.secret },
        body: JSON.stringify({ event, data: payload, sentAt: new Date().toISOString() }),
      })
    )
  );
}
