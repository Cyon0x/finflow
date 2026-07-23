// Client-side shapes matching what the API returns after JSON
// serialization (Prisma Decimal/BigInt-ish fields travel as strings, Dates
// as ISO strings).

export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";

export type ClientInvoice = {
  id: string;
  chainInvoiceId: number | null;
  ownerAddress: string;
  clientName: string;
  clientEmail: string | null;
  description: string;
  amountNative: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  txHashCreate: string | null;
  txHashPay: string | null;
  payerAddress: string | null;
  createdAt: string;
  updatedAt: string;
  paymentLink?: { slug: string } | null;
};

export type PaymentLinkType = "ONE_TIME" | "RECURRING" | "OPEN";

export type ClientPaymentLink = {
  id: string;
  slug: string;
  ownerAddress: string;
  type: PaymentLinkType;
  title: string;
  amountNative: string;
  note: string | null;
  active: boolean;
  invoiceId: string | null;
  invoice?: { chainInvoiceId: number | null; status: InvoiceStatus } | null;
  paidCount: number;
  createdAt: string;
};

export type TeamRole = "ADMIN" | "FINANCE" | "VIEWER";

export type ClientTeamMember = {
  id: string;
  ownerAddress: string;
  memberAddress: string;
  memberLabel: string | null;
  role: TeamRole;
  createdAt: string;
};

export type ClientApiKey = {
  id: string;
  label: string;
  env: "LIVE" | "TEST";
  keyPrefix: string;
  lastUsedAt: string | null;
  createdAt: string;
};

export type ClientWebhook = {
  id: string;
  url: string;
  secret: string;
  createdAt: string;
};

export type ClientEscrowRecord = {
  id: string;
  chainEscrowId: number;
  ownerAddress: string;
  contractor: string;
  amountNative: string;
  milestone: string;
  deadline: string;
  released: boolean;
  txHashCreate: string | null;
  txHashRelease: string | null;
  createdAt: string;
};

export type ClientBatchPayoutRecord = {
  id: string;
  ownerAddress: string;
  txHash: string;
  recipientCount: number;
  totalNative: string;
  feeNative: string;
  createdAt: string;
};
