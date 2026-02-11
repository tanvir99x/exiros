// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ExirosFee {
    address public owner;

    mapping(address => mapping(bytes32 => bool)) public paidTask;

    event TaskPaid(address indexed user, string taskId, uint256 amount);

    constructor() {
        owner = msg.sender; // 💰 your wallet
    }

    function payTaskFee(string calldata taskId) external payable {
        bytes32 key = keccak256(abi.encodePacked(taskId));

        require(!paidTask[msg.sender][key], "Task already paid");

        // 🔒 GM = $0.01 ≈ 0.000004 ETH
        if (keccak256(bytes(taskId)) == keccak256(bytes("gm_base"))) {
            require(msg.value >= 0.000004 ether, "GM fee too low");
        }

        // 🔒 DEPLOY = $0.1 ≈ 0.00004 ETH
        if (keccak256(bytes(taskId)) == keccak256(bytes("deploy_contract"))) {
            require(msg.value >= 0.00004 ether, "Deploy fee too low");
        }

        paidTask[msg.sender][key] = true;

        // 💸 ETH GOES DIRECTLY TO YOU
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "ETH transfer failed");

        emit TaskPaid(msg.sender, taskId, msg.value);
    }

    function hasPaid(address user, string calldata taskId)
        external
        view
        returns (bool)
    {
        return paidTask[user][keccak256(abi.encodePacked(taskId))];
    }
}
