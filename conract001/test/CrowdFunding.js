"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("CrowdFunding", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1000000000;
    const lockedAmount = ONE_GWEI;
    const unlockTime =
      (await hardhat_network_helpers_1.time.latest()) + ONE_YEAR_IN_SECS;
    const deadTime = await hardhat_network_helpers_1.time.latest();
    // Contracts are deployed using the first signer/account by default
    // const [owner, otherAccount] = await ethers.getSigners();
    // const Lock = await ethers.getContractFactory("Lock");
    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    const [owner, otherAccount] = await hardhat_1.ethers.getSigners();
    const CrowdSale = await hardhat_1.ethers.getContractFactory("CrowdFunding");
    const crowdsale = await CrowdSale.deploy(10000, deadTime);
    return { crowdsale, unlockTime, lockedAmount, owner, otherAccount };
  }
  describe("Send Ether", function () {
    describe("Should revert ", async function () {
      const { crowdsale } = await hardhat_network_helpers_1.loadFixture(
        deployOneYearLockFixture
      );
      await chai_1
        .expect(crowdsale.sendEth())
        .to.be.revertedWith("You can't withdraw yet");
    });
  });
});
