// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title FinFlow Escrow
/// @notice Locks native USDC (Arc's native gas token, 18 decimals — see
/// docs.arc.io) on behalf of a depositor until they release it to a
/// contractor, or reclaim it after the agreed deadline passes unreleased.
/// Companion contract to the already-deployed FinFlowTreasury, which handles
/// direct invoice payments but has no lock/release semantics.
contract FinFlowEscrow is Ownable, ReentrancyGuard {
    struct Escrow {
        uint256 id;
        address depositor;
        address contractor;
        uint256 amount;
        string milestone;
        uint256 deadline;
        bool released;
        bool refunded;
        uint256 createdAt;
    }

    uint256 public escrowCount;
    mapping(uint256 => Escrow) public escrows;

    /// @notice Protocol fee taken from the released amount, in basis points.
    uint256 public feeBps = 100; // 1%, matches FinFlow's stated payment fee
    uint256 public constant MAX_FEE_BPS = 300; // hard cap: 3%
    address public feeCollector;

    event EscrowCreated(
        uint256 indexed id,
        address indexed depositor,
        address indexed contractor,
        uint256 amount,
        string milestone,
        uint256 deadline
    );
    event EscrowReleased(uint256 indexed id, address indexed contractor, uint256 amountToContractor, uint256 fee);
    event EscrowRefunded(uint256 indexed id, address indexed depositor, uint256 amount);
    event FeeUpdated(uint256 feeBps);
    event FeeCollectorUpdated(address feeCollector);

    constructor(address adminWallet, address _feeCollector) Ownable(adminWallet) {
        require(adminWallet != address(0) && _feeCollector != address(0), "Zero address");
        feeCollector = _feeCollector;
    }

    function createEscrow(
        address contractor,
        string calldata milestone,
        uint256 deadline
    ) external payable returns (uint256) {
        require(contractor != address(0), "Invalid contractor");
        require(msg.value > 0, "Invalid amount");
        require(deadline > block.timestamp, "Deadline in past");
        require(bytes(milestone).length <= 200, "Milestone too long");

        escrowCount++;
        escrows[escrowCount] = Escrow({
            id: escrowCount,
            depositor: msg.sender,
            contractor: contractor,
            amount: msg.value,
            milestone: milestone,
            deadline: deadline,
            released: false,
            refunded: false,
            createdAt: block.timestamp
        });

        emit EscrowCreated(escrowCount, msg.sender, contractor, msg.value, milestone, deadline);
        return escrowCount;
    }

    /// @notice Depositor releases locked funds to the contractor. Callable
    /// any time before refund — the depositor decides when the milestone is
    /// satisfied, no external arbiter.
    function release(uint256 id) external nonReentrant {
        Escrow storage e = escrows[id];
        require(e.id != 0, "Missing escrow");
        require(msg.sender == e.depositor, "Not depositor");
        require(!e.released, "Already released");
        require(!e.refunded, "Already refunded");

        e.released = true;

        uint256 fee = (e.amount * feeBps) / 10_000;
        uint256 toContractor = e.amount - fee;

        (bool sentContractor, ) = payable(e.contractor).call{value: toContractor}("");
        require(sentContractor, "Payout failed");

        if (fee > 0) {
            (bool sentFee, ) = payable(feeCollector).call{value: fee}("");
            require(sentFee, "Fee transfer failed");
        }

        emit EscrowReleased(id, e.contractor, toContractor, fee);
    }

    /// @notice Depositor reclaims funds if the deadline passed without a
    /// release — protects the depositor from funds being stuck forever.
    function refundExpired(uint256 id) external nonReentrant {
        Escrow storage e = escrows[id];
        require(e.id != 0, "Missing escrow");
        require(msg.sender == e.depositor, "Not depositor");
        require(!e.released, "Already released");
        require(!e.refunded, "Already refunded");
        require(block.timestamp > e.deadline, "Not expired yet");

        e.refunded = true;

        (bool sent, ) = payable(e.depositor).call{value: e.amount}("");
        require(sent, "Refund failed");

        emit EscrowRefunded(id, e.depositor, e.amount);
    }

    function getEscrow(
        uint256 id
    )
        external
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            string memory,
            uint256,
            bool,
            bool,
            uint256
        )
    {
        Escrow memory e = escrows[id];
        return (e.id, e.depositor, e.contractor, e.amount, e.milestone, e.deadline, e.released, e.refunded, e.createdAt);
    }

    function setFeeBps(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= MAX_FEE_BPS, "Fee too high");
        feeBps = newFeeBps;
        emit FeeUpdated(newFeeBps);
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Zero address");
        feeCollector = newCollector;
        emit FeeCollectorUpdated(newCollector);
    }
}
