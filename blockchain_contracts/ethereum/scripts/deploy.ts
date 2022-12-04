import { ethers } from "hardhat";

async function main() {

  const NAME = "CrowdfundingForwarder";
  const VERSION = "0.1";
  const preEth = ethers.utils.parseEther("0.01");
  console.log({preEth});
  const Forwarder = await ethers.getContractFactory("Forwarder");

  const forwarder = await Forwarder.deploy(NAME, VERSION, { value: preEth.toString() });
 
  await forwarder.deployed();

  console.log("Deployed Forwarder with 0.1 ETH deployed to:", forwarder.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
