-- Historical records belong to Arc Testnet. Preserve them and let the
-- mainnet application explicitly create/read rows for chain 5042.
ALTER TABLE "Invoice" ADD COLUMN "chainId" INTEGER NOT NULL DEFAULT 5042002;
ALTER TABLE "PaymentLink" ADD COLUMN "chainId" INTEGER NOT NULL DEFAULT 5042002;
ALTER TABLE "EscrowRecord" ADD COLUMN "chainId" INTEGER NOT NULL DEFAULT 5042002;
ALTER TABLE "BatchPayoutRecord" ADD COLUMN "chainId" INTEGER NOT NULL DEFAULT 5042002;
ALTER TABLE "ApiKey" ADD COLUMN "chainId" INTEGER NOT NULL DEFAULT 5042002;

DROP INDEX "Invoice_chainInvoiceId_key";
DROP INDEX "EscrowRecord_chainEscrowId_key";
CREATE UNIQUE INDEX "Invoice_chainId_chainInvoiceId_key" ON "Invoice"("chainId", "chainInvoiceId");
CREATE UNIQUE INDEX "EscrowRecord_chainId_chainEscrowId_key" ON "EscrowRecord"("chainId", "chainEscrowId");

CREATE INDEX "Invoice_chainId_ownerAddress_idx" ON "Invoice"("chainId", "ownerAddress");
CREATE INDEX "PaymentLink_chainId_ownerAddress_idx" ON "PaymentLink"("chainId", "ownerAddress");
CREATE INDEX "EscrowRecord_chainId_ownerAddress_idx" ON "EscrowRecord"("chainId", "ownerAddress");
CREATE INDEX "BatchPayoutRecord_chainId_ownerAddress_idx" ON "BatchPayoutRecord"("chainId", "ownerAddress");
CREATE INDEX "ApiKey_chainId_ownerAddress_idx" ON "ApiKey"("chainId", "ownerAddress");
