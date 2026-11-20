import networks from "@/config/arc-networks.json";
import mainnetDeployment from "@/deployments/arc-mainnet.json";
import testnetDeployment from "@/deployments/arc-testnet.json";

// Network details: https://docs.arc.io/arc/references/connect-to-arc
// Mainnet chain ID and RPC were checked live before the production cutover.
//
// IMPORTANT: Arc's native currency IS USDC (18 decimals) — there is also a
// 6-decimal ERC-20 "view" of the same funds at 0x3600...0000, but this app
// deliberately never touches that contract. Every contract here
// (FinFlowTreasury, FinFlowEscrow, FinFlowBatchPayout) uses native
// payable/msg.value exclusively, so every amount in this codebase — user
// input, contract calls, balances — is native 18-decimal wei. Mixing in the
// 6-decimal view anywhere would silently corrupt amounts by 10^12x.

const selectedNetwork = process.env.NEXT_PUBLIC_ARC_NETWORK || "mainnet";
if (selectedNetwork !== "mainnet" && selectedNetwork !== "testnet") {
  throw new Error("NEXT_PUBLIC_ARC_NETWORK must be mainnet or testnet");
}

export const ARC_NETWORK_NAME = selectedNetwork;
export const ARC_IS_MAINNET = selectedNetwork === "mainnet";
const network = networks[selectedNetwork];
export const ARC_DEPLOYMENT = ARC_IS_MAINNET ? mainnetDeployment : testnetDeployment;
export const ARC_CHAIN_ID_DECIMAL = network.chainId;
export const ARC_CHAIN_ID_HEX = `0x${ARC_CHAIN_ID_DECIMAL.toString(16)}`;
export const ARC_NETWORK_LABEL = network.chainName;
export const ARC_API_KEY_ENV = ARC_IS_MAINNET ? "LIVE" : "TEST";

export const ARC_NETWORK = {
  chainId: ARC_CHAIN_ID_HEX,
  chainName: ARC_NETWORK_LABEL,
  nativeCurrency: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: [process.env.NEXT_PUBLIC_ARC_RPC_URL || network.rpcUrl],
  blockExplorerUrls: [network.explorerUrl],
} as const;

export const ARC_FUNDING_URL = network.fundingUrl;

export function explorerTxUrl(hash: string) {
  return `${ARC_NETWORK.blockExplorerUrls[0]}/tx/${hash}`;
}

export function explorerAddressUrl(address: string) {
  return `${ARC_NETWORK.blockExplorerUrls[0]}/address/${address}`;
}
