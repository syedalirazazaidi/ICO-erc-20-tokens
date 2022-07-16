// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract CrowdFunding {
    mapping(address => uint256) public contributors;
    address public manager;
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public target;
    uint256 public raisedAmount;
    uint256 public noOfContributors;

    constructor(uint256 _target, uint256 _deadline) {
        target = _target;
        deadline = block.timestamp + _deadline; //10sec + 3600sec (60*60)
        minimumContribution = 100 wei;
        manager = msg.sender;
    }
}
