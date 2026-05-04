import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x41BF49FD0606e525b73866BF54e063De5556F4bF";

export const ABI = [
  "function createInvoice(uint256 amount, string memo) returns (uint256)",
  "function payInvoice(uint256 id) payable",
  "function contractBalance() view returns (uint256)",
  "function getInvoice(uint256 id) view returns (uint256,address,string,uint256,bool,address,uint256,uint256)"
];

export async function getSigner() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  return await provider.getSigner();
}

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
}
