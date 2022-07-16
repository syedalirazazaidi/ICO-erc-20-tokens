"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
    const lockedAmount = hardhat_1.ethers.utils.parseEther("1");
    // LOCK
    // const Lock = await ethers.getContractFactory("Lock");
    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    // await lock.deployed();
    // CROWD FUNDING
    const Crowd = await hardhat_1.ethers.getContractFactory("CrowdFunding");
    const crowd = await Crowd.deploy(1000, unlockTime);
    await crowd.deployed();
    console.log("CROWD SALE with 1 ETH deployed to:", crowd.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
