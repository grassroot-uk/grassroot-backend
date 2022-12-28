import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { GrassrootCrowdfunding } from "../typechain-types/contracts/CrowdFunding.sol/GrassrootCrowdfunding";
import { SampleToken } from "../typechain-types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const FORWARDER_ADDRESS = "0xB60aE6229c034E984f91FaAb6274Cf956C36477a";

describe("Crowdfunding Grassroot", () => {
  let crowdfundingContract: GrassrootCrowdfunding;
  let tokenContract: SampleToken;
  let accounts: SignerWithAddress[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();

    let contractFactory = await ethers.getContractFactory(
      "GrassrootCrowdfunding"
    );

    crowdfundingContract = await upgrades.deployProxy(contractFactory, [], {
      initializer: "initialize",
      constructorArgs: [FORWARDER_ADDRESS],
    });
    await crowdfundingContract.deployed();

    let tokenFactory = await ethers.getContractFactory("SampleToken");
    tokenContract = await tokenFactory.deploy("USD Tether", "USDT");

    await tokenContract.deployed();

    let tx1 = await crowdfundingContract.allowERC20Token(tokenContract.address);
    await tx1.wait();

    const isTokenAllowed = await crowdfundingContract.allowedERC20Tokens(
      tokenContract.address
    );
    expect(isTokenAllowed).to.be.true;
  });

  it("Should have default forwarder Address", async () => {
    const isTrustedForwarder = await crowdfundingContract.isTrustedForwarder(
      FORWARDER_ADDRESS
    );
    expect(isTrustedForwarder).to.be.true;

    const isTrustedForwarder2 = await crowdfundingContract.isTrustedForwarder(
      accounts[1].address
    );
    expect(isTrustedForwarder2).to.be.false;
  });

  it("Should create an crowdfunding and view it", async () => {
    const crowdfunding = {
      _campaignAdmin: accounts[0].address,
      _tokenAddress: tokenContract.address,
      _campaignName: ethers.utils.formatBytes32String("Nauhari"),
      _metadataCid: "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF",
      _minAmountContribution: ethers.utils.parseUnits("20", 18),
      _targetAmount: ethers.utils.parseUnits("2000", 18),
      _category: 1,
      _validUntil: 60,
    };

    const tx1 = await crowdfundingContract.createCampaign(
      crowdfunding._campaignAdmin,
      crowdfunding._tokenAddress,
      crowdfunding._campaignName,
      crowdfunding._metadataCid,
      crowdfunding._minAmountContribution,
      crowdfunding._targetAmount,
      crowdfunding._category,
      crowdfunding._validUntil
    );
    await tx1.wait();

    const campaign = await crowdfundingContract.getCampaignValues(0);

    const currentContractsIdx =
      await crowdfundingContract._crowdfundingsCounter();

    expect(currentContractsIdx).to.be.eq(1);
    expect(campaign._campaignAdmin).to.be.eq(crowdfunding._campaignAdmin);

    const campaigns = await crowdfundingContract.getCampaignsInIdxRange(0, 1);

    const campaignTypes = [
      "address",
      "address",
      "bytes32",
      "string",
      "uint256",
      "uint256",
      "uint256",
      "uint16",
      "bool",
      "bool",
      "uint256",
    ];

    const decodedCampaign = ethers.utils.defaultAbiCoder.decode(
      campaignTypes,
      campaigns[0]
    );
    // console.log(decodedCampaign);

    expect(parseInt((Date.now() / 1000).toString())).to.be.lessThan(
      decodedCampaign[10]
    );
    expect(decodedCampaign[2]).to.be.eq(crowdfunding._campaignName);
  });

  it("should revert on creation of campaign from non allowed address", async () => {
    const crowdfunding = {
      _campaignAdmin: accounts[0].address,
      _tokenAddress: tokenContract.address,
      _campaignName: ethers.utils.formatBytes32String("Nauhari"),
      _metadataCid: "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF",
      _minAmountContribution: ethers.utils.parseUnits("20", 18),
      _targetAmount: ethers.utils.parseUnits("2000", 18),
      _category: 1,
      _validUntil: 60,
    };

    expect(crowdfundingContract.createCampaign(
      crowdfunding._campaignAdmin,
      crowdfunding._tokenAddress,
      crowdfunding._campaignName,
      crowdfunding._metadataCid,
      crowdfunding._minAmountContribution,
      crowdfunding._targetAmount,
      crowdfunding._category,
      crowdfunding._validUntil
    )).to.be.revertedWith("Not allowed to create Campaign");
  });

  it("Should create an crowdfunding and able to fullfill it.", async () => {



    const crowdfunding = {
      _campaignAdmin: accounts[1].address,
      _tokenAddress: tokenContract.address,
      _campaignName: ethers.utils.formatBytes32String("Nauhari"),
      _metadataCid: "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF",
      _minAmountContribution: ethers.utils.parseUnits("20", 18),
      _targetAmount: ethers.utils.parseUnits("200", 18),
      _category: 1,
      _validUntil: 0,
    };

    const tx1 = await crowdfundingContract.createCampaign(
      crowdfunding._campaignAdmin,
      crowdfunding._tokenAddress,
      crowdfunding._campaignName,
      crowdfunding._metadataCid,
      crowdfunding._minAmountContribution,
      crowdfunding._targetAmount,
      crowdfunding._category,
      crowdfunding._validUntil
    );
    await tx1.wait();

    const campaign = await crowdfundingContract.getCampaignValues(0);

    const currentContractsIdx =
      await crowdfundingContract._crowdfundingsCounter();

    expect(currentContractsIdx).to.be.eq(1);
    expect(campaign._campaignAdmin).to.be.eq(crowdfunding._campaignAdmin);

    const campaigns = await crowdfundingContract.getCampaignsInIdxRange(0, 1);

    const campaignTypes = [
      "address",
      "address",
      "bytes32",
      "string",
      "uint256",
      "uint256",
      "uint256",
      "uint16",
      "bool",
      "bool",
      "uint256",
    ];

    const decodedCampaign = ethers.utils.defaultAbiCoder.decode(
      campaignTypes,
      campaigns[0]
    );
    // console.log(decodedCampaign);

    expect(parseInt((Date.now() / 1000).toString())).to.be.lessThan(
      decodedCampaign[10]
    );
    expect(decodedCampaign[2]).to.be.eq(crowdfunding._campaignName);

    // Give allowance from admin account to crowdFunding Contract
    const donateAmount = ethers.utils.parseUnits("300", 18);
    const tx2 = await tokenContract.approve(
      crowdfundingContract.address,
      donateAmount
    );
    await tx2.wait();

    // Donate allowance to the campaign from account 0
    const tx3 = await crowdfundingContract.donate(0, donateAmount);
    await tx3.wait();

    const campaigns2 = await crowdfundingContract.getCampaignsInIdxRange(0, 1);

    const decodedCampaign2 = ethers.utils.defaultAbiCoder.decode(
      campaignTypes,
      campaigns2[0]
    );

    const contractTokenBalance = await tokenContract.balanceOf(
      crowdfundingContract.address
    );
    expect(contractTokenBalance).to.be.eq(donateAmount);

    await delay(15000);

    const tx4 = await crowdfundingContract
      .connect(accounts[1])
      .withdrawCampaign(0);
    await tx4.wait();

    const account1TokenBalance = await tokenContract.balanceOf(
      accounts[1].address
    );
    expect(account1TokenBalance).to.be.eq(donateAmount);

    const contractTokenBalance2 = await tokenContract.balanceOf(
      crowdfundingContract.address
    );
    expect(contractTokenBalance2).to.be.eq(0);

    expect(
      crowdfundingContract.connect(accounts[1]).withdrawCampaign(0)
    ).to.be.revertedWith("Campaign is Already Redeemed!!");
  });

  // it('Should create many crowdfundings and view it', async () => {
  //   const crowdfunding = {
  //     _campaignAdmin: accounts[0].address,
  //     _tokenAddress: tokenContract.address,
  //     _campaignName: ethers.utils.formatBytes32String('Nauhari'),
  //     _metadataCid: 'QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF',
  //     _minAmountContribution: ethers.utils.parseUnits('20', 8),
  //     _targetAmount: ethers.utils.parseUnits('2000', 8),
  //     _category: 1,
  //     _validUntil: 60,
  //   };

  //   for (let i = 0; i < 100; ++i) {
  //     const tx1 = await crowdfundingContract.createCampaign(
  //       crowdfunding._campaignAdmin,
  //       crowdfunding._tokenAddress,
  //       crowdfunding._campaignName,
  //       crowdfunding._metadataCid,
  //       crowdfunding._minAmountContribution,
  //       crowdfunding._targetAmount,
  //       crowdfunding._category,
  //       crowdfunding._validUntil,
  //     );
  //     await tx1.wait();
  //   }

  //   const currentContractsIdx =
  //     await crowdfundingContract._crowdfundingsCounter();

  //   expect(currentContractsIdx).to.be.eq(100);

  //   const campaigns = await crowdfundingContract.getCampaignsInIdxRange(0, 100);

  //   const campaignTypes = [
  //     'address',
  //     'address',
  //     'bytes32',
  //     'string',
  //     'uint256',
  //     'uint256',
  //     'uint256',
  //     'uint16',
  //     'bool',
  //     'bool',
  //     'uint256',
  //   ];

  //   campaigns.forEach((campaign, idx) => {
  //     const decodedCampaign = ethers.utils.defaultAbiCoder.decode(
  //       campaignTypes,
  //       campaign,
  //     );

  //     expect(decodedCampaign[2]).to.be.eq(crowdfunding._campaignName);
  //   });
  // });
});
