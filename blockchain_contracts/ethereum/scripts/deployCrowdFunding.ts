import { ethers, upgrades } from "hardhat";

async function main() {
  
  const accounts = await ethers.getSigners();

  const accountBalance = await accounts[0].getBalance();
  if(accountBalance.lte(10000000)) {
    console.error("Not Enough Balance!!");
    return;
  };

  console.log({accountBalance: ethers.utils.formatEther(accountBalance)});


  const NAME = "CrowdfundingForwarder";
  const VERSION = "0.1";
  const preEth = ethers.utils.parseEther("0.01");
  console.log({preEth});
  const Forwarder = await ethers.getContractFactory("Forwarder");

  const forwarder = await Forwarder.deploy(NAME, VERSION, { value: preEth.toString() });
 
  await forwarder.deployed();

  let contractFactory = await ethers.getContractFactory(
    'GrassrootCrowdfunding',
  );

  const crowdfundingContract = await upgrades.deployProxy(contractFactory, [], {
    initializer: 'initialize',
    constructorArgs: [forwarder.address],
  });
  await crowdfundingContract.deployed();
  
  console.log("Deployed Crowdfunding, deployed to:", crowdfundingContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
