// Arc Testnet network config — verified directly against Circle's docs
// (docs.arc.io/arc/references/connect-to-arc) and cross-checked live via
// eth_chainId against https://rpc.testnet.arc.network on 2026-07-23.
//
// IMPORTANT: Arc's native currency IS USDC (18 decimals) — there is also a
// 6-decimal ERC-20 "view" of the same funds at 0x3600...0000, but this app
// deliberately never touches that contract. Every contract here
// (FinFlowTreasury, FinFlowEscrow, FinFlowBatchPayout) uses native
// payable/msg.value exclusively, so every amount in this codebase — user
// input, contract calls, balances — is native 18-decimal wei. Mixing in the
// 6-decimal view anywhere would silently corrupt amounts by 10^12x.

export const ARC_TESTNET_CHAIN_ID_DECIMAL = 5042002;
export const ARC_TESTNET_CHAIN_ID_HEX = `0x${ARC_TESTNET_CHAIN_ID_DECIMAL.toString(16)}`;

export const ARC_TESTNET = {
  chainId: ARC_TESTNET_CHAIN_ID_HEX,
  chainName: "Arc Testnet",
  nativeCurrency: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.testnet.arc.network"],
  blockExplorerUrls: ["https://testnet.arcscan.app"],
} as const;

export const ARC_FAUCET_URL = "https://faucet.circle.com";

export function explorerTxUrl(hash: string) {
  return `${ARC_TESTNET.blockExplorerUrls[0]}/tx/${hash}`;
}

export function explorerAddressUrl(address: string) {
  return `${ARC_TESTNET.blockExplorerUrls[0]}/address/${address}`;
}
