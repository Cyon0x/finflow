const fs = require("node:fs");
const environment = require("dotenv").parse(fs.readFileSync(process.argv[2] || ".env"));
process.env.DATABASE_URL = environment.DATABASE_URL;
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  const tables = {
    invoices: db.invoice,
    paymentLinks: db.paymentLink,
    escrows: db.escrowRecord,
    payouts: db.batchPayoutRecord,
    apiKeys: db.apiKey,
    teamMembers: db.teamMember,
    webhooks: db.webhook,
  };
  const counts = {};
  for (const [name, model] of Object.entries(tables)) counts[name] = await model.count();
  const columns = await db.$queryRaw`SELECT table_name FROM information_schema.columns WHERE column_name = 'chainId' AND table_schema = 'public'`;
  console.log(JSON.stringify({ counts, networkScopedTables: columns.map((row) => row.table_name) }));
}

main().catch((e) => {
  const message = String(e.message).replace(/postgres(?:ql)?:\/\/[^\s"'<>]+/g, "[database URL]");
  console.error(JSON.stringify({ databaseCheckFailed: true, name: e.name, code: e.code || e.errorCode, message }));
  process.exitCode = 1;
}).finally(() => db.$disconnect());
