const hre = require("hardhat");

// Deploys the two contracts FinFlow is missing on Arc Testnet:
// Escrow and BatchPayout. FinFlowTreasury is already live at
// 0x41BF49FD0606e525b73866BF54e063De5556F4bF and is NOT redeployed here.
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account configured. Set DEPLOYER_PRIVATE_KEY in .env (see .env.example)."
    );
  }

  console.log("Deploying from:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance (native USDC, 18 decimals):", hre.ethers.formatEther(balance));

  if (balance === 0n) {
    throw new Error(
      `Deployer wallet ${deployer.address} has 0 balance. Fund it at https://faucet.circle.com first.`
    );
  }

  const feeCollector = deployer.address; // fees flow to the same wallet that owns FinFlowTreasury

  const Escrow = await hre.ethers.getContractFactory("FinFlowEscrow");
  const escrow = await Escrow.deploy(deployer.address, feeCollector);
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("FinFlowEscrow deployed:", escrowAddress);

  const BatchPayout = await hre.ethers.getContractFactory("FinFlowBatchPayout");
  const batchPayout = await BatchPayout.deploy(deployer.address, feeCollector);
  await batchPayout.waitForDeployment();
  const batchPayoutAddress = await batchPayout.getAddress();
  console.log("FinFlowBatchPayout deployed:", batchPayoutAddress);

  console.log("\nAdd these to your .env and Vercel project env vars:");
  console.log(`NEXT_PUBLIC_ESCROW_ADDRESS="${escrowAddress}"`);
  console.log(`NEXT_PUBLIC_BATCHPAYOUT_ADDRESS="${batchPayoutAddress}"`);

  console.log("\nVerify on Arc explorer with:");
  console.log(
    `npx hardhat verify --network arcTestnet ${escrowAddress} ${deployer.address} ${feeCollector}`
  );
  console.log(
    `npx hardhat verify --network arcTestnet ${batchPayoutAddress} ${deployer.address} ${feeCollector}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
