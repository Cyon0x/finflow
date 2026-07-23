# FinFlow

Stablecoin payments, invoicing, and treasury infrastructure for Arc Testnet — USDC in, USDC out, non-custodial the whole way.

## What's actually real here

Everything below executes a real transaction on Arc Testnet or reads real on-chain state. Nothing in the UI is decorative sample data.

- **Wallet connection** — MetaMask (and Coinbase Wallet, if injected), with automatic Arc Testnet add/switch. A "Demo Mode" exists for browsing the UI without a wallet; it's clearly labeled and can't sign transactions.
- **Invoices & payments** — [`FinFlowTreasury`](https://testnet.arcscan.app/address/0x41BF49FD0606e525b73866BF54e063De5556F4bF) (deployed before this rebuild, verified source in `contracts/reference/`). `createInvoice` / `payInvoice` are called directly from the connected wallet.
- **Escrow** — [`FinFlowEscrow`](https://testnet.arcscan.app/address/0x337bC1C478172A799aBe2134a98aBBAcA3418FF2), deployed and verified by this repo. Depositor locks funds, releases to the contractor when satisfied, or reclaims after the deadline if never released.
- **Batch payouts** — [`FinFlowBatchPayout`](https://testnet.arcscan.app/address/0x823B02D1857B191FcA211d9679C8377D8Abe3B09), deployed and verified by this repo. Sends USDC to up to 200 recipients in one transaction.
- **Payment links** — real, shareable `/pay/[slug]` URLs backed by an on-chain invoice (fixed amount) or a direct-transfer "open amount" link.
- **PDF invoices/receipts** — generated client-side, includes the real tx hash and contract address.
- **Live FX rates** — NGN/KES/GHS/ZAR via a free public API (USDC ≈ USD peg).
- **API keys & webhooks** — real key generation (SHA-256 hashed, shown once), and two key-gated public endpoints under `/api/v1/*` (see [API & Dev](#api--dev) below).

## What's honestly not real (yet)

- **Off-ramp (USDC → bank account)** is a waitlist, not a working withdrawal. Real fiat off-ramp needs a licensed money-transmission partner (Kotani Pay, Yellow Card, Bitnob, etc.) and KYC — that's a business integration, not something to fake in a demo.
- **Team roles** gate the FinFlow UI, not the smart contracts. `FinFlowTreasury` and `FinFlowEscrow` are owned by a single wallet; team "roles" here are an app-level allowlist, not on-chain access control.
- **Recurring payment links** aren't implemented — the deployed contracts have no subscription logic, so this was deliberately left out rather than faked with a link that doesn't actually recur.
- **Subscription billing (Pro/Business plans)** is unenforced — the pricing cards describe the roadmap, not a working paywall.

## Why native 18-decimal amounts everywhere

Arc's native gas token *is* USDC (18 decimals) — there's also a 6-decimal ERC-20 "view" of the same funds at `0x3600…0000`, but this app never touches it. `FinFlowTreasury` already committed to `payable`/`msg.value` (native) for invoices, so `FinFlowEscrow` and `FinFlowBatchPayout` follow the same convention for consistency — no `approve()` step anywhere in the app. See `lib/web3/chain.ts` and `lib/web3/format.ts` for the conversion helpers, and don't mix these with 6-decimal math.

## Stack

Next.js 14 (App Router) + TypeScript, Prisma/Postgres, ethers v6, Hardhat + OpenZeppelin for contracts, vanilla CSS design system (no Tailwind).

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL at minimum
npm run db:push        # create tables
npm run dev
```

Contract addresses in `.env.example` are already live on Arc Testnet — you don't need to redeploy to run the app locally. If you do want your own copies:

```bash
# DEPLOYER_PRIVATE_KEY in .env — fund it first at https://faucet.circle.com
npm run contracts:test     # 12 tests, run these before deploying
npm run contracts:deploy
```

## Deploying

1. **Database**: create a free Postgres at [neon.tech](https://neon.tech), copy the connection string.
2. **Vercel**: import this GitHub repo at vercel.com → New Project. Add env vars from `.env.example` (at minimum `DATABASE_URL`; contract addresses already default correctly). Deploy.
3. **After first deploy**: run `npx prisma db push` locally against the production `DATABASE_URL` to create tables (or wire a build-step migration if you prefer).
4. **Cron**: `vercel.json` schedules a daily reconciliation job (`/api/cron/sync`) — Vercel's Hobby plan caps cron at once/day, which is why this is a backstop, not the primary data path. Invoice/escrow status updates immediately when a payment happens through the app; the cron just catches anything that happened outside it.

## API & Dev

Two key-gated endpoints under `/api/v1/`, authenticated via `Authorization: Bearer <key>` (generate a key in Settings → API & Dev):

- `POST /api/v1/payment-links` — creates an open-amount payment link. Scoped to open-amount only: a fixed-amount link needs an on-chain `createInvoice()` call signed by the merchant's own wallet, which a server-side API key can't do on a non-custodial platform.
- `POST /api/v1/payouts/batch` — returns unsigned transaction data (`to`, `data`, `value`) for a batch payout. You sign and send it yourself — FinFlow never holds a private key on your behalf.

## Known follow-ups

- Next.js is pinned to 14.2.35 (latest patched 14.x). A move to Next 15/16 is worth doing later but wasn't done here to avoid an untested major-version jump mid-build.
- No automated Prisma migration step in the Vercel build — `db push` is manual for now.
