const hre = require("hardhat");
const fs = require("node:fs");
const path = require("node:path");
const SOURCIFY = "https://sourcify.dev/server/v2";

async function main() {
  if (hre.network.name !== "arcMainnet" || (await hre.ethers.provider.getNetwork()).chainId !== 5042n) throw new Error("Verification must target Arc Mainnet (5042)");
  const filename = path.join(__dirname, "..", "deployments", "arc-mainnet.json");
  const manifest = JSON.parse(fs.readFileSync(filename, "utf8"));
  const sources = { FinFlowTreasury: "contracts/reference/FinFlowTreasury.sol", FinFlowEscrow: "contracts/Escrow.sol", FinFlowBatchPayout: "contracts/BatchPayout.sol" };
  const save = () => fs.writeFileSync(filename, `${JSON.stringify(manifest, null, 2)}\n`);
  const failures = [];
  for (const [name, contract] of Object.entries(manifest.contracts)) {
    try {
      const url = `${SOURCIFY}/contract/5042/${contract.address}`;
      const existingResponse = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      let verified = existingResponse.ok ? await existingResponse.json() : null;
      if (verified?.runtimeMatch !== "exact_match" || verified?.creationMatch !== "exact_match") {
        let jobId = contract.sourceVerification?.jobId;
        if (!jobId) {
          const identifier = `${sources[name]}:${name}`;
          const build = await hre.artifacts.getBuildInfo(identifier);
          if (!build) throw new Error("Missing compiler build info");
          const response = await fetch(`${SOURCIFY}/verify/5042/${contract.address}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stdJsonInput: build.input, compilerVersion: build.solcLongVersion, contractIdentifier: identifier, creationTransactionHash: contract.transactionHash }),
            signal: AbortSignal.timeout(30_000),
          });
          const result = await response.json();
          if (response.status === 409) {
            verified = await (await fetch(url)).json();
          } else {
            if (!response.ok || !result.verificationId) throw new Error(result.message || `Sourcify returned ${response.status}`);
            jobId = result.verificationId;
            contract.sourceVerification = { provider: "sourcify", jobId, url, status: "pending" };
            save();
            console.log(`${name}: verification submitted (${jobId})`);
          }
        }
        if (jobId) {
          for (let attempt = 0; attempt < 60; attempt++) {
            const response = await fetch(`${SOURCIFY}/verify/${jobId}`, { signal: AbortSignal.timeout(30_000) });
            const job = await response.json();
            if (!response.ok) throw new Error(job.message || `Sourcify returned ${response.status}`);
            if (job.isJobCompleted) {
              if (job.error) throw new Error(job.error.message);
              verified = job.contract;
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }
      if (verified?.runtimeMatch !== "exact_match" || verified?.creationMatch !== "exact_match") throw new Error("Exact source verification is incomplete");
      contract.sourceVerification = { provider: "sourcify", url, status: "verified", runtimeMatch: verified.runtimeMatch, creationMatch: verified.creationMatch };
      console.log(`${name}: source verified exactly on Arc Mainnet`);
    } catch (error) {
      console.error(`${name}: ${error.shortMessage || error.message}`);
      failures.push(name);
    }
    save();
  }
  if (failures.length) throw new Error(`Source verification incomplete for ${failures.join(", ")}`);
}

main().catch((error) => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
