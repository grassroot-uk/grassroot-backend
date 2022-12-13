import { ethers, upgrades } from "hardhat";

async function main() {
  
  const accounts = await ethers.getSigners();

  const accountBalance = await accounts[0].getBalance();
  if(accountBalance.lte(10000000)) {
    console.error("Not Enough Balance!!");
    return;
  };

  console.log({accountBalance: ethers.utils.formatEther(accountBalance)});

  const CROWDFUNDING_CONTRACT_ADDRESS = "0x6ddC3Bde48ADdE719dee30200587A484b5db2bd7";

  let contractFactory = await ethers.getContractFactory(
    'DAOS',
  );

  const daosContract = await upgrades.deployProxy(contractFactory, [], {
    initializer: 'initialize',
    constructorArgs: [],
  });
  await daosContract.deployed();
  
  console.log("Deployed DAOs Contract, deployed to:", daosContract.address);

  const tx = await daosContract.connect(accounts[0]).setCrowdfundingContract(CROWDFUNDING_CONTRACT_ADDRESS);
  const txReceipt = await tx.wait();

  const crowdfundingContract = await daosContract.crowdfundingContract();
  console.log("Crowdfunding Contract in the DAOs Contract: ", crowdfundingContract);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
