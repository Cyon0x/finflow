const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FinFlowBatchPayout", function () {
  async function deploy() {
    const [owner, feeCollector, sender, r1, r2, r3] = await ethers.getSigners();
    const BatchPayout = await ethers.getContractFactory("FinFlowBatchPayout");
    const batch = await BatchPayout.deploy(owner.address, feeCollector.address);
    return { batch, owner, feeCollector, sender, r1, r2, r3 };
  }

  it("quote() matches manual fee math", async function () {
    const { batch } = await deploy();
    const amounts = [ethers.parseEther("300"), ethers.parseEther("200")];
    const [total, fee, valueToSend] = await batch.quote(amounts);
    expect(total).to.equal(ethers.parseEther("500"));
    expect(fee).to.equal(ethers.parseEther("5")); // 1%
    expect(valueToSend).to.equal(ethers.parseEther("505"));
  });

  it("pays every recipient their full amount and routes fee to feeCollector", async function () {
    const { batch, feeCollector, sender, r1, r2 } = await deploy();
    const amounts = [ethers.parseEther("300"), ethers.parseEther("200")];
    const [, fee, valueToSend] = await batch.quote(amounts);

    await expect(
      batch.connect(sender).disperseNative([r1.address, r2.address], amounts, { value: valueToSend })
    ).to.changeEtherBalances([r1, r2, feeCollector], [amounts[0], amounts[1], fee]);
  });

  it("reverts if msg.value doesn't exactly match quote", async function () {
    const { batch, sender, r1, r2 } = await deploy();
    const amounts = [ethers.parseEther("300"), ethers.parseEther("200")];

    await expect(
      batch.connect(sender).disperseNative([r1.address, r2.address], amounts, { value: ethers.parseEther("500") })
    ).to.be.revertedWith("Incorrect value sent");
  });

  it("reverts on mismatched array lengths and zero recipients", async function () {
    const { batch, sender, r1 } = await deploy();
    await expect(
      batch.connect(sender).disperseNative([r1.address], [1, 2], { value: 1 })
    ).to.be.revertedWith("Length mismatch");
    await expect(
      batch.connect(sender).disperseNative([], [], { value: 0 })
    ).to.be.revertedWith("Bad recipient count");
  });

  it("only owner can update feeBps, capped at MAX_FEE_BPS", async function () {
    const { batch, owner, sender } = await deploy();
    await expect(batch.connect(sender).setFeeBps(50)).to.be.revertedWithCustomError(batch, "OwnableUnauthorizedAccount");
    await expect(batch.connect(owner).setFeeBps(301)).to.be.revertedWith("Fee too high");
  });
});
