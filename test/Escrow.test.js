const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("FinFlowEscrow", function () {
  async function deploy() {
    const [owner, feeCollector, depositor, contractor, stranger] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("FinFlowEscrow");
    const escrow = await Escrow.deploy(owner.address, feeCollector.address);
    return { escrow, owner, feeCollector, depositor, contractor, stranger };
  }

  it("locks funds on createEscrow and emits EscrowCreated", async function () {
    const { escrow, depositor, contractor } = await deploy();
    const deadline = (await time.latest()) + 3600;
    const amount = ethers.parseEther("500");

    await expect(escrow.connect(depositor).createEscrow(contractor.address, "Ship v1", deadline, { value: amount }))
      .to.emit(escrow, "EscrowCreated")
      .withArgs(1, depositor.address, contractor.address, amount, "Ship v1", deadline);

    expect(await ethers.provider.getBalance(await escrow.getAddress())).to.equal(amount);
  });

  it("releases funds to contractor minus fee, fee to feeCollector", async function () {
    const { escrow, feeCollector, depositor, contractor } = await deploy();
    const deadline = (await time.latest()) + 3600;
    const amount = ethers.parseEther("1000");
    await escrow.connect(depositor).createEscrow(contractor.address, "Audit", deadline, { value: amount });

    const fee = (amount * 100n) / 10_000n; // 1% default
    const toContractor = amount - fee;

    await expect(escrow.connect(depositor).release(1)).to.changeEtherBalances(
      [contractor, feeCollector],
      [toContractor, fee]
    );
  });

  it("rejects release from anyone but the depositor", async function () {
    const { escrow, depositor, contractor, stranger } = await deploy();
    const deadline = (await time.latest()) + 3600;
    await escrow.connect(depositor).createEscrow(contractor.address, "x", deadline, { value: ethers.parseEther("1") });

    await expect(escrow.connect(stranger).release(1)).to.be.revertedWith("Not depositor");
  });

  it("rejects double release", async function () {
    const { escrow, depositor, contractor } = await deploy();
    const deadline = (await time.latest()) + 3600;
    await escrow.connect(depositor).createEscrow(contractor.address, "x", deadline, { value: ethers.parseEther("1") });
    await escrow.connect(depositor).release(1);

    await expect(escrow.connect(depositor).release(1)).to.be.revertedWith("Already released");
  });

  it("blocks refundExpired before the deadline", async function () {
    const { escrow, depositor, contractor } = await deploy();
    const deadline = (await time.latest()) + 3600;
    await escrow.connect(depositor).createEscrow(contractor.address, "x", deadline, { value: ethers.parseEther("1") });

    await expect(escrow.connect(depositor).refundExpired(1)).to.be.revertedWith("Not expired yet");
  });

  it("allows refundExpired to the depositor after the deadline", async function () {
    const { escrow, depositor, contractor } = await deploy();
    const deadline = (await time.latest()) + 3600;
    const amount = ethers.parseEther("2");
    await escrow.connect(depositor).createEscrow(contractor.address, "x", deadline, { value: amount });

    await time.increaseTo(deadline + 1);

    await expect(escrow.connect(depositor).refundExpired(1)).to.changeEtherBalance(depositor, amount);
  });

  it("caps setFeeBps at MAX_FEE_BPS and is owner-only", async function () {
    const { escrow, owner, stranger } = await deploy();
    await expect(escrow.connect(stranger).setFeeBps(50)).to.be.revertedWithCustomError(escrow, "OwnableUnauthorizedAccount");
    await expect(escrow.connect(owner).setFeeBps(301)).to.be.revertedWith("Fee too high");
    await escrow.connect(owner).setFeeBps(300);
    expect(await escrow.feeBps()).to.equal(300);
  });
});
