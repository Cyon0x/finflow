-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentLinkType" AS ENUM ('ONE_TIME', 'RECURRING', 'OPEN');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('ADMIN', 'FINANCE', 'VIEWER');

-- CreateEnum
CREATE TYPE "ApiKeyEnv" AS ENUM ('LIVE', 'TEST');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "chainInvoiceId" INTEGER,
    "ownerAddress" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT,
    "description" TEXT NOT NULL,
    "amountNative" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "txHashCreate" TEXT,
    "txHashPay" TEXT,
    "payerAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentLink" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "type" "PaymentLinkType" NOT NULL DEFAULT 'ONE_TIME',
    "title" TEXT NOT NULL,
    "amountNative" TEXT NOT NULL,
    "note" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "invoiceId" TEXT,
    "paidCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "memberAddress" TEXT NOT NULL,
    "memberLabel" TEXT,
    "role" "TeamRole" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "env" "ApiKeyEnv" NOT NULL DEFAULT 'TEST',
    "keyPrefix" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfframpWaitlistEntry" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfframpWaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscrowRecord" (
    "id" TEXT NOT NULL,
    "chainEscrowId" INTEGER NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "amountNative" TEXT NOT NULL,
    "milestone" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "released" BOOLEAN NOT NULL DEFAULT false,
    "txHashCreate" TEXT,
    "txHashRelease" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EscrowRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncCursor" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "lastBlock" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncCursor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchPayoutRecord" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "recipientCount" INTEGER NOT NULL,
    "totalNative" TEXT NOT NULL,
    "feeNative" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchPayoutRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_chainInvoiceId_key" ON "Invoice"("chainInvoiceId");

-- CreateIndex
CREATE INDEX "Invoice_ownerAddress_idx" ON "Invoice"("ownerAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLink_slug_key" ON "PaymentLink"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLink_invoiceId_key" ON "PaymentLink"("invoiceId");

-- CreateIndex
CREATE INDEX "PaymentLink_ownerAddress_idx" ON "PaymentLink"("ownerAddress");

-- CreateIndex
CREATE INDEX "TeamMember_ownerAddress_idx" ON "TeamMember"("ownerAddress");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_ownerAddress_memberAddress_key" ON "TeamMember"("ownerAddress", "memberAddress");

-- CreateIndex
CREATE INDEX "ApiKey_ownerAddress_idx" ON "ApiKey"("ownerAddress");

-- CreateIndex
CREATE INDEX "Webhook_ownerAddress_idx" ON "Webhook"("ownerAddress");

-- CreateIndex
CREATE INDEX "OfframpWaitlistEntry_address_idx" ON "OfframpWaitlistEntry"("address");

-- CreateIndex
CREATE UNIQUE INDEX "EscrowRecord_chainEscrowId_key" ON "EscrowRecord"("chainEscrowId");

-- CreateIndex
CREATE INDEX "EscrowRecord_ownerAddress_idx" ON "EscrowRecord"("ownerAddress");

-- CreateIndex
CREATE UNIQUE INDEX "BatchPayoutRecord_txHash_key" ON "BatchPayoutRecord"("txHash");

-- CreateIndex
CREATE INDEX "BatchPayoutRecord_ownerAddress_idx" ON "BatchPayoutRecord"("ownerAddress");

-- AddForeignKey
ALTER TABLE "PaymentLink" ADD CONSTRAINT "PaymentLink_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

