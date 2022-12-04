import { ethers } from "hardhat";

async function main() {

  const SYMBOL = "USDC";
  const NAME = "USD Coin";

  const SampleToken = await ethers.getContractFactory("SampleToken");

  const tokenContract = await SampleToken.deploy(NAME, SYMBOL);
 
  await tokenContract.deployed();

  console.log("Deployed Token Contract USDC Address:", tokenContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
