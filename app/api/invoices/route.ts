import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    where: { ownerAddress: owner },
    orderBy: { createdAt: "desc" },
    include: { paymentLink: { select: { slug: true } } },
  });
  return NextResponse.json({ invoices });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { clientName, clientEmail, description, amountNative, dueDate, chainInvoiceId, txHashCreate } = body;
  if (!clientName || !description || !amountNative || !dueDate || !chainInvoiceId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const invoice = await prisma.invoice.create({
    data: {
      ownerAddress: owner,
      clientName,
      clientEmail: clientEmail || null,
      description,
      amountNative: String(amountNative),
      dueDate: new Date(dueDate),
      chainInvoiceId: Number(chainInvoiceId),
      txHashCreate: txHashCreate || null,
      status: "PENDING",
    },
  });

  return NextResponse.json({ invoice }, { status: 201 });
}
