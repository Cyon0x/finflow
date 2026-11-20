const hre = require("hardhat");
const fs = require("node:fs");
const path = require("node:path");
const networks = require("../config/arc-networks.json");

const EXPECTED_DEPLOYER = "0x73cc6BD174543bE6F2Fb40DA7C3C041ceB8c0b1d";
const CONTRACT_NAMES = ["FinFlowTreasury", "FinFlowEscrow", "FinFlowBatchPayout"];

async function main() {
  const entry = Object.entries(networks).find(([, config]) => config.hardhatNetwork === hre.network.name);
  if (!entry || entry[0] !== "mainnet") throw new Error("The deployment tool targets --network arcMainnet; testnet deployments are retained as history");
  const [networkName, config] = entry;
  const dryRun = process.env.FINFLOW_DEPLOY_DRY_RUN === "1";
  const { ethers } = hre;
  const provider = ethers.provider;
  const actualNetwork = await provider.getNetwork();
  if (actualNetwork.chainId !== BigInt(config.chainId)) throw new Error("RPC chain ID does not match the requested network");

  const [deployer] = await ethers.getSigners();
  if (!deployer || deployer.address !== EXPECTED_DEPLOYER) throw new Error(`Configure DEPLOYER_PRIVATE_KEY for ${EXPECTED_DEPLOYER}`);
  const balance = await provider.getBalance(deployer.address);
  console.log(`${dryRun ? "Deployment plan" : "Deployment"}: ${config.chainName} (${config.chainId})`);
  console.log(`Wallet: ${deployer.address}; balance: ${ethers.formatEther(balance)} USDC`);

  const filename = path.join(__dirname, "..", "deployments", `arc-${networkName}.json`);
  const manifest = JSON.parse(fs.readFileSync(filename, "utf8"));
  if (manifest.chainId !== config.chainId || manifest.deployer !== deployer.address) throw new Error("Deployment manifest does not match this network and wallet");
  const save = () => {
    fs.writeFileSync(`${filename}.tmp`, `${JSON.stringify(manifest, null, 2)}\n`);
    fs.renameSync(`${filename}.tmp`, filename);
  };

  const verifyDeployment = async (name, record) => {
    const code = await provider.getCode(record.address);
    const artifact = await hre.artifacts.readArtifact(name);
    if (code.toLowerCase() !== artifact.deployedBytecode.toLowerCase()) throw new Error(`${name}: deployed bytecode differs from the tested artifact`);
    const contract = await ethers.getContractAt(name, record.address);
    if ((await contract.owner()) !== deployer.address) throw new Error(`${name}: owner is not the requested deployer`);
    if (name !== "FinFlowTreasury" && (await contract.feeCollector()) !== deployer.address) throw new Error(`${name}: unexpected fee collector`);
  };

  const floor = ethers.parseUnits("20", "gwei");
  const suggested = BigInt(await provider.send("eth_gasPrice", [])) * 2n;
  const fees = { maxFeePerGas: suggested > floor ? suggested : floor, maxPriorityFeePerGas: ethers.parseUnits("1", "gwei") };
  const plans = [];
  for (const name of CONTRACT_NAMES) {
    const existing = manifest.contracts[name];
    if (existing.address) {
      if (existing.transactionHash && !existing.blockNumber && !dryRun) {
        const receipt = await provider.waitForTransaction(existing.transactionHash, 1, 120_000);
        if (!receipt || receipt.status !== 1) throw new Error(`${name}: earlier deployment did not succeed`);
        existing.blockNumber = receipt.blockNumber;
        save();
      }
      await verifyDeployment(name, existing);
      console.log(`${name}: already deployed at ${existing.address}`);
      continue;
    }
    const args = name === "FinFlowTreasury" ? [deployer.address] : [deployer.address, deployer.address];
    const factory = await ethers.getContractFactory(name, deployer);
    const request = await factory.getDeployTransaction(...args, fees);
    const estimatedGas = await deployer.estimateGas(request);
    const gasLimit = estimatedGas * 120n / 100n;
    plans.push({ name, args, factory, gasLimit });
    console.log(`${name}: estimated ${estimatedGas} gas; maximum ${ethers.formatEther(gasLimit * fees.maxFeePerGas)} USDC`);
  }

  const totalMaximum = plans.reduce((total, plan) => total + plan.gasLimit * fees.maxFeePerGas, 0n);
  console.log(`Maximum gas budget: ${ethers.formatEther(totalMaximum)} USDC`);
  if (balance < totalMaximum) throw new Error("Wallet balance does not cover the complete deployment");
  const budget = ethers.parseEther(process.env.FINFLOW_MAX_DEPLOYMENT_USDC || "1");
  if (totalMaximum > budget) throw new Error("Deployment exceeds FINFLOW_MAX_DEPLOYMENT_USDC");
  if (dryRun || plans.length === 0) return;
  const pendingNonce = await provider.getTransactionCount(deployer.address, "pending");
  const latestNonce = await provider.getTransactionCount(deployer.address, "latest");
  if (pendingNonce !== latestNonce) throw new Error("The deployer has pending transactions; resolve them before deploying");

  for (const plan of plans) {
    const contract = await plan.factory.deploy(...plan.args, { ...fees, gasLimit: plan.gasLimit });
    const tx = contract.deploymentTransaction();
    const address = await contract.getAddress();
    manifest.contracts[plan.name] = { address, transactionHash: tx.hash, blockNumber: 0, constructorArguments: plan.args };
    // Persist the broadcast hash immediately so an interrupted run resumes
    // the same deployment rather than spending gas on another copy.
    save();
    console.log(`${plan.name} broadcast: ${config.explorerUrl}/tx/${tx.hash}`);
    const receipt = await tx.wait(1, 120_000);
    if (!receipt || receipt.status !== 1) throw new Error(`${plan.name}: deployment failed`);
    Object.assign(manifest.contracts[plan.name], {
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      gasCostUsdc: ethers.formatEther(receipt.gasUsed * receipt.gasPrice),
    });
    manifest.deployedAt = new Date().toISOString();
    save();
    await verifyDeployment(plan.name, manifest.contracts[plan.name]);
    console.log(`${plan.name} confirmed: ${config.explorerUrl}/address/${address}`);
  }
  console.log(`Saved deployment records to deployments/arc-${networkName}.json`);
}

main().catch((error) => {
  console.error(error.shortMessage || error.message || "Deployment failed");
  process.exitCode = 1;
});
