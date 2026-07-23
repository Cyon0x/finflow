import { jsPDF } from "jspdf";
import { weiToUsdc } from "./web3/format";
import type { ClientInvoice } from "./types";
import { TREASURY_ADDRESS } from "./web3/contracts";
import { explorerTxUrl } from "./web3/chain";

export function downloadInvoicePdf(invoice: ClientInvoice, merchantLabel = "FinFlow Merchant") {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 48;
  let y = 64;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("FinFlow", left, y);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Stablecoin invoice — settled in USDC on Arc Testnet", left, y + 18);

  y += 56;
  doc.setDrawColor(220);
  doc.line(left, y, 548, y);
  y += 32;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Invoice #${invoice.chainInvoiceId ?? "—"}`, left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Status: ${invoice.status}`, 420, y);

  y += 24;
  doc.setFontSize(10);
  doc.text(`Issue date: ${new Date(invoice.issueDate).toLocaleDateString()}`, left, y);
  doc.text(`Due date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 420, y);

  y += 32;
  doc.setFont("helvetica", "bold");
  doc.text("From (merchant)", left, y);
  doc.text("To (client)", 320, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(merchantLabel, left, y);
  doc.text(invoice.ownerAddress, left, y + 12, { maxWidth: 240 });
  doc.setFontSize(10);
  doc.text(invoice.clientName, 320, y);
  if (invoice.clientEmail) doc.text(invoice.clientEmail, 320, y + 14);

  y += 56;
  doc.setDrawColor(220);
  doc.line(left, y, 548, y);
  y += 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DESCRIPTION", left, y);
  doc.text("AMOUNT (USDC)", 420, y);
  y += 16;
  doc.setDrawColor(230);
  doc.line(left, y, 548, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(invoice.description, 340);
  doc.text(descLines, left, y);
  doc.text(weiToUsdc(invoice.amountNative), 420, y);
  y += descLines.length * 14 + 24;

  doc.setDrawColor(220);
  doc.line(320, y, 548, y);
  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", 320, y);
  doc.text(`${weiToUsdc(invoice.amountNative)} USDC`, 420, y);

  y += 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`FinFlowTreasury contract: ${TREASURY_ADDRESS}`, left, y);
  if (invoice.txHashCreate) doc.text(`Created tx: ${invoice.txHashCreate}`, left, y + 12);
  if (invoice.txHashPay) doc.text(`Payment tx: ${invoice.txHashPay}`, left, y + 24);
  y += 40;
  doc.text("Verify on-chain: " + explorerTxUrl(invoice.txHashPay || invoice.txHashCreate || ""), left, y);

  doc.save(`finflow-invoice-${invoice.chainInvoiceId ?? invoice.id}.pdf`);
}
