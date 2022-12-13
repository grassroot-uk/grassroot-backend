// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface CrowdfundingCampaign {
    function createCampaign(
        address _campaignAdmin,
        address _tokenAddress,
        bytes32 _campaignName,
        string memory _metadataCid,
        uint256 _minAmountContribution,
        uint256 _targetAmount,
        uint16 _category,
        uint256 _validUntil
    ) external returns (uint256);
}
