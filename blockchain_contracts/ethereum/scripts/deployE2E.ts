import { ethers, upgrades } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();

  const accountBalance = await accounts[0].getBalance();
  if (accountBalance.lte(10000000)) {
    console.error("Not Enough Balance!!");
    return;
  }

  console.log({ accountBalance: ethers.utils.formatEther(accountBalance) });

  //   USDT ERC20 Sample Token
  const SYMBOL = "USDC";
  const NAME = "USD Coin";

  const SampleToken = await ethers.getContractFactory("SampleToken");

  const tokenContract = await SampleToken.deploy(NAME, SYMBOL);

  await tokenContract.deployed();

  console.log("Deployed Token Contract USDC Address:", tokenContract.address);

  //   Crowdfunding Stuff
  const NAMEFORWARDER = "CrowdfundingForwarder";
  const VERSION = "0.1";
  const preEth = ethers.utils.parseEther("0.01");
  console.log({ preEth });
  const Forwarder = await ethers.getContractFactory("Forwarder");

  const forwarder = await Forwarder.deploy(NAMEFORWARDER, VERSION, {
    value: preEth.toString(),
  });

  await forwarder.deployed();

  let contractFactoryCrowdfunding = await ethers.getContractFactory(
    "GrassrootCrowdfunding"
  );

  const crowdfundingContract = await upgrades.deployProxy(
    contractFactoryCrowdfunding,
    [],
    {
      initializer: "initialize",
      constructorArgs: [forwarder.address],
    }
  );
  await crowdfundingContract.deployed();

  console.log(
    "Deployed Crowdfunding, deployed to:",
    crowdfundingContract.address
  );

  const tx3 = await crowdfundingContract.allowERC20Token(tokenContract.address);
  await tx3.wait();

  const isAllowedToken = await crowdfundingContract.allowedERC20Tokens(
    tokenContract.address
  );
  console.log(
    "Is Token: ",
    tokenContract.address,
    " Allowed in CrowdFunding: ",
    isAllowedToken
  );

  //   DAO Stuff
  let contractFactory = await ethers.getContractFactory("DAOS");

  const daosContract = await upgrades.deployProxy(contractFactory, [], {
    initializer: "initialize",
    constructorArgs: [],
  });
  await daosContract.deployed();

  console.log("Deployed DAOs Contract, deployed to:", daosContract.address);

  const tx = await daosContract
    .connect(accounts[0])
    .setCrowdfundingContract(crowdfundingContract.address);
  const txReceipt = await tx.wait();

  const crowdfundingContractDAO = await daosContract.crowdfundingContract();
  console.log(
    "Crowdfunding Contract in the DAOs Contract: ",
    crowdfundingContractDAO
  );

  const tx2 = await crowdfundingContract.addAllowedAddress(
    daosContract.address
  );
  await tx2.wait();

  const isAllowedDAOInCampaign = await crowdfundingContract.allowedAddresses(
    daosContract.address
  );
  console.log("Is allowed DAO Contract: ", isAllowedDAOInCampaign);


  console.log("Final Deployed Addresses..");
  console.log({
    daoContract: daosContract.address,
    crowdfundingContract: crowdfundingContract.address,
    sampleERC20TokenAddress: tokenContract.address
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
