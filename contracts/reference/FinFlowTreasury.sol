// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Reference copy only — NOT deployed by this repo.
//
// This is the exact verified source of the FinFlowTreasury contract already
// live on Arc Testnet at 0x41BF49FD0606e525b73866BF54e063De5556F4bF
// (https://testnet.arcscan.app/address/0x41BF49FD0606e525b73866BF54e063De5556F4bF),
// pulled from Blockscout's verified-source API. It's kept here so Hardhat
// can compile it and produce a byte-exact ABI in artifacts/ for the
// frontend to import from — see lib/web3/treasury.ts — instead of a
// hand-transcribed ABI that could silently drift from the real contract.
//
// Do not modify and do not add a deploy step for this file.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract FinFlowTreasury is Ownable {
    using Address for address;

    bool public paused;
    uint256 private unlocked = 1;

    uint256 public invoiceCount;
    uint256 public paymentCount;

    struct Invoice {
        uint256 id;
        address merchant;
        string memo;
        uint256 amount;
        bool paid;
        address payer;
        uint256 createdAt;
        uint256 paidAt;
    }

    struct Payment {
        uint256 id;
        address from;
        uint256 amount;
        string paymentReference;
        uint256 createdAt;
    }

    mapping(uint256 => Invoice) public invoices;
    mapping(uint256 => Payment) public payments;

    event Paused(bool status);
    event PaymentReceived(
        uint256 indexed id,
        address indexed from,
        uint256 amount,
        string paymentReference
    );

    event InvoiceCreated(
        uint256 indexed id,
        address indexed merchant,
        uint256 amount,
        string memo
    );

    event InvoicePaid(
        uint256 indexed id,
        address indexed payer,
        uint256 amount
    );

    event Withdrawn(address indexed to, uint256 amount);

    modifier whenNotPaused() {
        require(!paused, "Paused");
        _;
    }

    modifier nonReentrant() {
        require(unlocked == 1, "Locked");
        unlocked = 2;
        _;
        unlocked = 1;
    }

    constructor(address adminWallet) Ownable(adminWallet) {
        require(adminWallet != address(0), "Zero address");
    }

    receive() external payable {
        paymentCount++;

        payments[paymentCount] = Payment({
            id: paymentCount,
            from: msg.sender,
            amount: msg.value,
            paymentReference: "Direct Payment",
            createdAt: block.timestamp
        });

        emit PaymentReceived(
            paymentCount,
            msg.sender,
            msg.value,
            "Direct Payment"
        );
    }

    function setPaused(bool status) external onlyOwner {
        paused = status;
        emit Paused(status);
    }

    function createInvoice(
        uint256 amount,
        string calldata memo
    ) external whenNotPaused returns (uint256) {
        require(amount > 0, "Invalid amount");
        require(bytes(memo).length <= 120, "Memo too long");

        invoiceCount++;

        invoices[invoiceCount] = Invoice({
            id: invoiceCount,
            merchant: msg.sender,
            memo: memo,
            amount: amount,
            paid: false,
            payer: address(0),
            createdAt: block.timestamp,
            paidAt: 0
        });

        emit InvoiceCreated(
            invoiceCount,
            msg.sender,
            amount,
            memo
        );

        return invoiceCount;
    }

    function payInvoice(
        uint256 id
    ) external payable whenNotPaused nonReentrant {
        Invoice storage inv = invoices[id];

        require(inv.id != 0, "Missing invoice");
        require(!inv.paid, "Already paid");
        require(msg.value >= inv.amount, "Insufficient payment");

        inv.paid = true;
        inv.payer = msg.sender;
        inv.paidAt = block.timestamp;

        (bool sent, ) = payable(inv.merchant).call{value: inv.amount}("");
        require(sent, "Merchant payment failed");

        if (msg.value > inv.amount) {
            (bool refunded, ) = payable(msg.sender).call{
                value: msg.value - inv.amount
            }("");
            require(refunded, "Refund failed");
        }

        emit InvoicePaid(id, msg.sender, inv.amount);
    }

    function ownerWithdraw(
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(address(this).balance >= amount, "Low balance");

        (bool sent, ) = payable(owner()).call{value: amount}("");
        require(sent, "Withdraw failed");

        emit Withdrawn(owner(), amount);
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getInvoice(
        uint256 id
    )
        external
        view
        returns (
            uint256,
            address,
            string memory,
            uint256,
            bool,
            address,
            uint256,
            uint256
        )
    {
        Invoice memory inv = invoices[id];

        return (
            inv.id,
            inv.merchant,
            inv.memo,
            inv.amount,
            inv.paid,
            inv.payer,
            inv.createdAt,
            inv.paidAt
        );
    }
}
