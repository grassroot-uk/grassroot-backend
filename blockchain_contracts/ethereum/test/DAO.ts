import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { GrassrootCrowdfunding } from "../typechain-types/contracts/CrowdFunding.sol/GrassrootCrowdfunding";
import { SampleToken, DAOS } from "../typechain-types";
import { BigNumber } from "ethers";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const FORWARDER_ADDRESS = "0xB60aE6229c034E984f91FaAb6274Cf956C36477a";

describe("Crowdfunding Grassroot", () => {
  let crowdfundingContract: GrassrootCrowdfunding;
  let daoContract: DAOS;
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

    let daoFactory = await ethers.getContractFactory("DAOS");
    daoContract = await upgrades.deployProxy(daoFactory, [], {
      initializer: "initialize",
    });
    await daoContract.deployed();

    const tx2 = await crowdfundingContract.addAllowedAddress(
      daoContract.address
    );
    await tx2.wait();

    const tx3 = await daoContract.setCrowdfundingContract(
      crowdfundingContract.address
    );
    await tx3.wait();

    const isDAOAllowedCreator = await crowdfundingContract.allowedAddresses(
      daoContract.address
    );
    expect(isDAOAllowedCreator).to.be.true;

    const isTokenAllowed = await crowdfundingContract.allowedERC20Tokens(
      tokenContract.address
    );
    expect(isTokenAllowed).to.be.true;

    const crowdFundingCampaignAddressOnDAO =
      await daoContract.crowdfundingContract();
    expect(crowdFundingCampaignAddressOnDAO).to.be.eq(
      crowdfundingContract.address
    );
  });

  it("Should have create DAO", async () => {
    const tx1 = await daoContract
      .connect(accounts[1])
      .createDao("Super DAO", "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF");
    await tx1.wait();

    const daoData = await daoContract.daos(0);
    expect(daoData.admin).to.be.eq(accounts[1].address);
  });

  describe("DAO Functions", async () => {
    beforeEach(async () => {
      const tx1 = await daoContract
        .connect(accounts[1])
        .createDao(
          "Super DAO",
          "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF"
        );
      await tx1.wait();

      const tx2 = await daoContract
        .connect(accounts[0])
        .createDao(
          "Super DAO2",
          "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF"
        );
      await tx2.wait();
    });

    it("Create Campaign", async () => {
      const crowdfunding = {
        _campaignAdmin: accounts[1].address,
        _tokenAddress: tokenContract.address,
        _campaignName: ethers.utils.formatBytes32String("Nauhari"),
        _metadataCid: "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF",
        _minAmountContribution: ethers.utils.parseUnits("20", 18),
        _targetAmount: ethers.utils.parseUnits("2000", 18),
        _category: 1,
        _validUntil: 0,
      };

      const tx1 = await daoContract.connect(accounts[1]).createCampaign(
        crowdfunding._campaignAdmin,
        crowdfunding._tokenAddress,
        crowdfunding._campaignName,
        crowdfunding._metadataCid,
        crowdfunding._minAmountContribution,
        crowdfunding._targetAmount,
        crowdfunding._category,
        crowdfunding._validUntil,
        0 // DAOId
      );
      const tx1Receipt = await tx1.wait();

      const gasUsed1 = BigNumber.from(tx1Receipt.gasUsed);
      const gasPrice1 = BigNumber.from(tx1.gasPrice);

      console.log(
        "Gas guzzling txn costed: ",
        gasUsed1.toString(),
        "Gas Units."
      );
      console.log(
        "Gas Costs: ",
        ethers.utils.formatEther(gasUsed1.mul(gasPrice1))
      );

      const campaign = await crowdfundingContract.getCampaignValues(0);

      const currentContractsIdx =
        await crowdfundingContract._crowdfundingsCounter();

      expect(currentContractsIdx).to.be.eq(1);
      expect(campaign._campaignAdmin).to.be.eq(crowdfunding._campaignAdmin);

      const daoLinkToCampaign = await daoContract.campaignToDaos(0);
      expect(daoLinkToCampaign).to.be.eq(0);

      const tx2 = await daoContract.connect(accounts[0]).createCampaign(
        crowdfunding._campaignAdmin,
        crowdfunding._tokenAddress,
        crowdfunding._campaignName,
        crowdfunding._metadataCid,
        crowdfunding._minAmountContribution,
        crowdfunding._targetAmount,
        crowdfunding._category,
        crowdfunding._validUntil,
        1 // DAOId
      );
      const tx2Receipt = await tx1.wait();

      const gasUsed2 = BigNumber.from(tx2Receipt.gasUsed);
      const gasPrice2 = BigNumber.from(tx2.gasPrice);

      console.log(
        "Gas guzzling txn costed: ",
        gasUsed2.toString(),
        "Gas Units."
      );
      console.log(
        "Gas Costs: ",
        ethers.utils.formatEther(gasUsed2.mul(gasPrice2))
      );

      const daoLinkToCampaign2 = await daoContract.campaignToDaos(1);
      expect(daoLinkToCampaign2).to.be.eq(1);
    });

    it("Should able to follow DAO", async () => {
      const tx1 = await daoContract.connect(accounts[2]).getMembership(0);
      const tx1Receipt = await tx1.wait();

      const gasUsed1 = BigNumber.from(tx1Receipt.gasUsed);
      const gasPrice1 = BigNumber.from(tx1.gasPrice);

      console.log("Gas txn costed: ", gasUsed1.toString(), "Gas Units.");
      console.log(
        "Gas Costs to Follow: ",
        ethers.utils.formatEther(gasUsed1.mul(gasPrice1))
      );

      const isFollowing = await daoContract.memberships(0, accounts[2].address);
      expect(isFollowing).to.be.true;

      const tx2 = await daoContract
        .connect(accounts[1])
        .revokeMembership(0, accounts[2].address);
      await tx2.wait();

      const isFollowing2 = await daoContract.memberships(
        0,
        accounts[2].address
      );
      expect(isFollowing2).to.be.false;

      const tx3 = await daoContract
        .connect(accounts[1])
        .grantMembership(0, accounts[2].address);
      await tx3.wait();

      const isFollowing3 = await daoContract.memberships(
        0,
        accounts[2].address
      );
      expect(isFollowing3).to.be.true;

      const tx4 = await daoContract
        .connect(accounts[2])
        .revokeMembership(0, accounts[2].address);
      const isFollowing4 = await daoContract.memberships(
        0,
        accounts[2].address
      );
      expect(isFollowing4).to.be.false;
    });
  });
});
