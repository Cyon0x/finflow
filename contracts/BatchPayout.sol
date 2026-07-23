// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title FinFlow Batch Payout
/// @notice Sends native USDC (Arc's native gas token, 18 decimals) to many
/// recipients in a single transaction — used for payroll runs and bulk
/// vendor payouts. Caller pays sum(amounts) plus a protocol fee on top;
/// each recipient receives their full listed amount.
contract FinFlowBatchPayout is Ownable, ReentrancyGuard {
    uint256 public feeBps = 100; // 1%, matches FinFlow's stated payout fee
    uint256 public constant MAX_FEE_BPS = 300; // hard cap: 3%
    uint256 public constant MAX_RECIPIENTS = 200; // bound gas per tx
    address public feeCollector;

    event BatchPayoutExecuted(
        address indexed sender,
        uint256 recipientCount,
        uint256 totalPaid,
        uint256 fee
    );
    event FeeUpdated(uint256 feeBps);
    event FeeCollectorUpdated(address feeCollector);

    constructor(address adminWallet, address _feeCollector) Ownable(adminWallet) {
        require(adminWallet != address(0) && _feeCollector != address(0), "Zero address");
        feeCollector = _feeCollector;
    }

    /// @notice `msg.value` must equal sum(amounts) + fee, where fee is
    /// computed via `quote(amounts)`. Use `quote` off-chain before sending
    /// the transaction to compute the exact value to attach.
    function disperseNative(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external payable nonReentrant {
        uint256 len = recipients.length;
        require(len > 0 && len <= MAX_RECIPIENTS, "Bad recipient count");
        require(len == amounts.length, "Length mismatch");

        uint256 total = 0;
        for (uint256 i = 0; i < len; i++) {
            require(recipients[i] != address(0), "Invalid recipient");
            require(amounts[i] > 0, "Invalid amount");
            total += amounts[i];
        }

        uint256 fee = (total * feeBps) / 10_000;
        require(msg.value == total + fee, "Incorrect value sent");

        for (uint256 i = 0; i < len; i++) {
            (bool sent, ) = payable(recipients[i]).call{value: amounts[i]}("");
            require(sent, "Payout leg failed");
        }

        if (fee > 0) {
            (bool sentFee, ) = payable(feeCollector).call{value: fee}("");
            require(sentFee, "Fee transfer failed");
        }

        emit BatchPayoutExecuted(msg.sender, len, total, fee);
    }

    /// @notice Read-only helper: computes (total, fee, valueToSend) for a
    /// given amounts array so the frontend can display an exact quote
    /// before the user signs.
    function quote(uint256[] calldata amounts) external view returns (uint256 total, uint256 fee, uint256 valueToSend) {
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        fee = (total * feeBps) / 10_000;
        valueToSend = total + fee;
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
