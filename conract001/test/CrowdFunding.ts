import { CrowdFunding__factory } from "./../typechain-types/factories/CrowdFunding__factory";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrowdFunding", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    const deadTime = await time.latest();

    const [owner, otherAccount] = await ethers.getSigners();

    const CrowdSale: CrowdFunding__factory = await ethers.getContractFactory(
      "CrowdFunding"
    );
    const crowdsale = await CrowdSale.deploy(10000, deadTime);
    return { crowdsale, unlockTime, lockedAmount, owner, otherAccount };
  }
  describe("Send Ether", function () {
    describe("Should revert ", async function () {
      const { crowdsale } = await loadFixture(deployOneYearLockFixture);

      await expect(crowdsale.sendEth()).to.be.revertedWith(
        "Deadline has passed"
      );
    });
  });
});
