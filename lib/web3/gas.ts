import { ethers } from "ethers";
import { ARC_CHAIN_ID_DECIMAL } from "./chain";

// Arc's native USDC uses 18 decimals. The mempool enforces a 20 Gwei
// maxFeePerGas floor: https://docs.arc.io/arc/references/gas-and-fees
export async function arcTransactionOverrides(signerOrProvider: ethers.Signer | ethers.Provider) {
  const provider = "provider" in signerOrProvider ? signerOrProvider.provider : signerOrProvider;
  if (!provider) throw new Error("Wallet provider is unavailable");
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(ARC_CHAIN_ID_DECIMAL)) throw new Error("Switch your wallet to the FinFlow network before sending");
  const fees = await provider.getFeeData();
  const floor = ethers.parseUnits("20", "gwei");
  const priority = fees.maxPriorityFeePerGas ?? ethers.parseUnits("1", "gwei");
  const suggested = fees.maxFeePerGas ?? (fees.gasPrice ? fees.gasPrice * 2n : floor + priority);
  return {
    chainId: ARC_CHAIN_ID_DECIMAL,
    maxFeePerGas: suggested > floor + priority ? suggested : floor + priority,
    maxPriorityFeePerGas: priority,
  };
}
