const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FinFlowTreasury", function () {
  async function deploy() {
    const [owner, merchant, payer, stranger] = await ethers.getSigners();
    const Treasury = await ethers.getContractFactory("FinFlowTreasury");
    const treasury = await Treasury.deploy(owner.address);
    return { treasury, owner, merchant, payer, stranger, Treasury };
  }

  it("sets the specified admin and rejects a zero admin", async function () {
    const { treasury, owner, Treasury } = await deploy();
    expect(await treasury.owner()).to.equal(owner.address);
    await expect(Treasury.deploy(ethers.ZeroAddress)).to.be.revertedWithCustomError(treasury, "OwnableInvalidOwner");
  });

  it("records the real merchant, amount and memo when an invoice is created", async function () {
    const { treasury, merchant } = await deploy();
    const amount = ethers.parseEther("100");
    await expect(treasury.connect(merchant).createInvoice(amount, "Services"))
      .to.emit(treasury, "InvoiceCreated").withArgs(1, merchant.address, amount, "Services");
    const invoice = await treasury.getInvoice(1);
    expect(invoice[1]).to.equal(merchant.address);
    expect(invoice[3]).to.equal(amount);
    expect(invoice[4]).to.equal(false);
  });

  it("pays the merchant directly and keeps no invoice funds in the treasury", async function () {
    const { treasury, merchant, payer } = await deploy();
    const amount = ethers.parseEther("100");
    await treasury.connect(merchant).createInvoice(amount, "Services");
    await expect(treasury.connect(payer).payInvoice(1, { value: amount }))
      .to.changeEtherBalances([merchant, treasury], [amount, 0]);
    const invoice = await treasury.getInvoice(1);
    expect(invoice[4]).to.equal(true);
    expect(invoice[5]).to.equal(payer.address);
  });

  it("refunds overpayment to the payer", async function () {
    const { treasury, merchant, payer } = await deploy();
    const amount = ethers.parseEther("100");
    await treasury.connect(merchant).createInvoice(amount, "Services");
    await expect(treasury.connect(payer).payInvoice(1, { value: ethers.parseEther("125") }))
      .to.changeEtherBalances([merchant, payer, treasury], [amount, -amount, 0]);
  });

  it("rejects underpayment without changing invoice state", async function () {
    const { treasury, merchant, payer } = await deploy();
    await treasury.connect(merchant).createInvoice(100, "Services");
    await expect(treasury.connect(payer).payInvoice(1, { value: 99 })).to.be.revertedWith("Insufficient payment");
    expect((await treasury.getInvoice(1))[4]).to.equal(false);
  });

  it("rejects missing invoices and duplicate payments", async function () {
    const { treasury, merchant, payer } = await deploy();
    await expect(treasury.connect(payer).payInvoice(1, { value: 100 })).to.be.revertedWith("Missing invoice");
    await treasury.connect(merchant).createInvoice(100, "Services");
    await treasury.connect(payer).payInvoice(1, { value: 100 });
    await expect(treasury.connect(payer).payInvoice(1, { value: 100 })).to.be.revertedWith("Already paid");
  });

  it("rejects zero amounts and oversized memos", async function () {
    const { treasury, merchant } = await deploy();
    await expect(treasury.connect(merchant).createInvoice(0, "Services")).to.be.revertedWith("Invalid amount");
    await expect(treasury.connect(merchant).createInvoice(1, "x".repeat(121))).to.be.revertedWith("Memo too long");
  });

  it("only allows the admin to pause, and pauses creation and payment", async function () {
    const { treasury, owner, merchant, payer, stranger } = await deploy();
    await treasury.connect(merchant).createInvoice(100, "Services");
    await expect(treasury.connect(stranger).setPaused(true)).to.be.revertedWithCustomError(treasury, "OwnableUnauthorizedAccount");
    await treasury.connect(owner).setPaused(true);
    await expect(treasury.connect(merchant).createInvoice(100, "Services")).to.be.revertedWith("Paused");
    await expect(treasury.connect(payer).payInvoice(1, { value: 100 })).to.be.revertedWith("Paused");
    await treasury.connect(owner).setPaused(false);
    await expect(treasury.connect(payer).payInvoice(1, { value: 100 })).to.emit(treasury, "InvoicePaid");
  });

  it("records direct deposits and restricts withdrawals to the admin", async function () {
    const { treasury, owner, payer, stranger } = await deploy();
    await payer.sendTransaction({ to: await treasury.getAddress(), value: 100 });
    expect(await treasury.paymentCount()).to.equal(1);
    expect((await treasury.payments(1)).from).to.equal(payer.address);
    await expect(treasury.connect(stranger).ownerWithdraw(100)).to.be.revertedWithCustomError(treasury, "OwnableUnauthorizedAccount");
    await expect(treasury.connect(owner).ownerWithdraw(101)).to.be.revertedWith("Low balance");
    await expect(treasury.connect(owner).ownerWithdraw(100)).to.changeEtherBalances([owner, treasury], [100, -100]);
  });
});
