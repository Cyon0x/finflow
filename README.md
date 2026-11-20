# FinFlow

Stablecoin payments, invoicing, escrow, and payroll on **Arc Mainnet**. Arc uses native USDC for both payments and gas, with **18 decimals**. FinFlow is non-custodial: connected wallets sign their own transactions.

## Mainnet deployment

Network settings are verified against [Circle’s Arc documentation](https://docs.arc.io/arc/references/connect-to-arc) and the live RPC:

- Chain ID: **5042** (`0x13b2`)
- RPC: `https://rpc.mainnet.arc.io`
- Explorer: `https://explorer.arc.io`
- Deployer and contract admin: `0x73cc6BD174543bE6F2Fb40DA7C3C041ceB8c0b1d`

| Contract | Mainnet address | Behavior |
| --- | --- | --- |
| FinFlowTreasury | [0x41BF49FD0606e525b73866BF54e063De5556F4bF](https://explorer.arc.io/address/0x41BF49FD0606e525b73866BF54e063De5556F4bF) | Invoice creation, direct merchant settlement, and overpayment refunds |
| FinFlowEscrow | [0x337bC1C478172A799aBe2134a98aBBAcA3418FF2](https://explorer.arc.io/address/0x337bC1C478172A799aBe2134a98aBBAcA3418FF2) | Depositor-controlled release and refunds after expiry |
| FinFlowBatchPayout | [0x823B02D1857B191FcA211d9679C8377D8Abe3B09](https://explorer.arc.io/address/0x823B02D1857B191FcA211d9679C8377D8Abe3B09) | Up to 200 recipients in one transaction |

[deployments/arc-mainnet.json](deployments/arc-mainnet.json) records transaction hashes, deployment blocks, gas costs, constructor arguments, and exact source verification through Sourcify. The mainnet addresses match the historical testnet addresses because the same wallet used the same deployment nonces. The chain ID and mainnet receipts distinguish the deployments.

## Features

- MetaMask and injected Coinbase Wallet connections automatically add/switch to Arc Mainnet. Transactions recheck the connected account and chain and apply Arc’s 20 Gwei minimum gas fee cap.
- Invoices and fixed payment links settle directly from the payer to the merchant. Treasury takes no invoice fee. Open amount links transfer directly to the link creator’s wallet.
- Branded payment QR codes support PNG, SVG, and PDF export, plus WhatsApp, Telegram, Email, and X sharing.
- Escrow charges a default 1% release fee; batch payouts add a default 1% fee to the recipients’ total. Both fee collectors are the deployer wallet. Admin fee settings are capped at 3%.
- Dashboard, payment and payout history, analytics, team wallets, business display names, PDFs, and live NGN/KES/GHS/ZAR exchange rates.
- Wallet-authenticated APIs, live API keys, payment-link and unsigned payout developer endpoints, and daily reconciliation/webhooks.
- A labeled demo mode supports viewing the interface without signing transactions.

## Testnet history and mainnet data

The database migration assigns existing invoices, payment links, escrows, payouts, and API keys to Arc Testnet (`5042002`). New records explicitly use mainnet (`5042`); invoice and escrow IDs are unique within each chain. Old testnet payment links cannot initiate mainnet payments, and reconciliation reads only the active network.

Mainnet API keys are newly generated in **API & Dev → Live Key**. Historical testnet keys cannot authorize mainnet operations. Wallet authentication messages also include the chain ID. Invoice, escrow, and payout recording checks confirmed transactions against the active contracts.

Testnet balances and contract state remain on testnet. Mainnet invoices and escrows are new records backed by real mainnet USDC. The historical deployment manifest is [deployments/arc-testnet.json](deployments/arc-testnet.json).

## Stack and setup

Next.js 14 App Router, React, TypeScript, Prisma/Postgres, ethers v6, Hardhat/OpenZeppelin, and vanilla CSS.

```bash
npm install
cp .env.example .env
# Set DATABASE_URL. Mainnet network and contract settings are already provided.
npx prisma migrate deploy
npm run dev
```

`npm run build` applies committed migrations, generates the Prisma client, and builds Next.js. Database changes belong in `prisma/migrations/`; use `npm run db:migrate` when making a new schema change.

For historical testnet debugging, set `NEXT_PUBLIC_ARC_NETWORK=testnet` and `NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.io` before starting/building the app. Mainnet is the default.

## Contract deployment and checks

The contracts are already deployed. The mainnet deployment script uses the same admin wallet and resumes from its recorded transaction hashes so a rerun does not create extra copies.

```bash
npm run contracts:test   # 21 contract behavior tests
npm run contracts:plan   # Read-only mainnet gas/ownership/bytecode checks
npm run contracts:deploy # Only broadcasts contracts missing from the manifest
npm run contracts:verify
npm run mainnet:check    # Checks mainnet receipts, sender, bytecode, ownership and fees
```

`DEPLOYER_PRIVATE_KEY` is used only by local deployment tools. Keep it in the ignored local environment file; the Next.js app and Vercel runtime do not need it. Gas is paid with real native USDC. The deployment script requires sufficient balance for all remaining contracts and a maximum gas budget of 1 USDC unless explicitly configured with `FINFLOW_MAX_DEPLOYMENT_USDC`.

## Developer API

Generate a live key in **API & Dev**, then use `Authorization: Bearer ff_live_...`:

- `POST /api/v1/payment-links` creates an open amount payment link and returns its URL and chain ID.
- `POST /api/v1/payouts/batch` accepts up to 200 `{address, amount}` recipients, where `amount` is USDC. It returns mainnet contract calldata, native 18-decimal `value`, chain ID, current fee quote, and EIP-1559 gas settings. The caller signs and sends the transaction.
- `GET /api/network` exposes the active chain and public deployment configuration.

For an integration check against a local mainnet-configured server:

```bash
npm start -- -p 3142
node scripts/network-integration-test.js http://localhost:3142
```

The check tests network isolation, live key issuance, native USDC payout encoding, confirmed-transaction validation, and payment-link creation. Its database fixtures are rolled back or removed; it sends no financial transactions.

## Production deployment

Import/link this repository in Vercel, provide `DATABASE_URL` and `CRON_SECRET`, and build. Network settings and contract addresses default to the confirmed mainnet manifest. All public pages, wallet connections, server reads, payout APIs, PDF captions, and explorer links share the selected network configuration.

## Features awaiting integration

Bank off-ramp is a waitlist pending a provider integration. Recurring billing and paid subscription enforcement are not implemented. Team roles govern application permissions; smart-contract ownership remains with the admin wallet. Rate limiting is currently per-instance.
