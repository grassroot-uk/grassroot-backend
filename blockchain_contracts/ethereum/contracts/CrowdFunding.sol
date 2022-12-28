// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

pragma abicoder v2;

// TODO: Have mechanism to send back the amounts back to the donater if campaign goal is not reached.

contract GrassrootCrowdfunding is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    ERC2771Context
{
    using Counters for Counters.Counter;

    Counters.Counter public _crowdfundingsCounter;

    struct Crowdfunding {
        address _campaignAdmin;
        address _tokenAddress;
        bytes32 _campaignName;
        string _metadataCid;
        uint256 _minAmountContribution;
        uint256 _targetAmount;
        uint256 _tokenCollected;
        uint16 _category;
        bool _isCompleted;
        bool _isRedeemed;
        uint256 _validUntil;
    }

    mapping(uint256 => Crowdfunding) public crowdfundingCampaigns;

    mapping(address => bool) public allowedAddresses;
    mapping(IERC20 => bool) public allowedERC20Tokens;

    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event CampaignCreated(
        address _campaignAdmin,
        address _tokenAddress,
        bytes32 _campaignName,
        string _metadataCid,
        uint256 _minAmountContribution,
        uint256 _targetAmount,
        uint16 _category,
        uint256 _validUntil
    );

    event CampaignCompleted(
        uint256 _campaignId,
        uint256 _completedAt,
        uint256 _blockNumber
    );

    event Donated(
        address _donater,
        uint256 _campaignId,
        uint256 _donated,
        address _tokenaddress
    );

    event CampaignRedeemed(
        uint256 _campaignId,
        address _campaignAdmin,
        address _tokenAddress,
        uint256 _tokenRedeemed
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(address _trustedForwarder) ERC2771Context(_trustedForwarder) {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(UPGRADER_ROLE, ADMIN_ROLE);
        _grantRole(UPGRADER_ROLE, msg.sender);
        allowedAddresses[msg.sender] = true;
    }

    /**
     * @dev Add the ERC20Token Address from the allowedERC20Tokens mapping.
     * @param erc20Token Token which we want to remove from allowed tokens.
     */
    function allowERC20Token(address erc20Token) public onlyRole(ADMIN_ROLE) {
        allowedERC20Tokens[IERC20(erc20Token)] = true;
    }

    /**
     * @dev Removes the ERC20Token Address from the allowedERC20Tokens mapping.
     * @param erc20Token Token which we want to remove from allowed tokens.
     */
    function removeERC20Token(address erc20Token) public onlyRole(ADMIN_ROLE) {
        allowedERC20Tokens[IERC20(erc20Token)] = false;
    }

    /**
     * @dev Allows a new Address for creating Campaigns Right
     */
    function addAllowedAddress(
        address _newAllowedAddress
    ) public onlyRole(ADMIN_ROLE) {
        allowedAddresses[_newAllowedAddress] = true;
    }

    /**
     * @dev Removed a address from creating campaign right
     */
    function revokeAllowedAddress(
        address _address
    ) public onlyRole(ADMIN_ROLE) {
        allowedAddresses[_address] = false;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {}

    function _msgData()
        internal
        view
        override(ContextUpgradeable, ERC2771Context)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    function _msgSender()
        internal
        view
        override(ContextUpgradeable, ERC2771Context)
        returns (address sender)
    {
        return super._msgSender();
    }

    // Grassroot Campaign Implementation from here

    /**
     * @dev Anyone can access this function
     * @notice You are creating a new Campaign in CrowdFunding Grassroot.
     * @param _campaignAdmin The Administrator for that campaign
     * @param _tokenAddress The ERC20 token address which the denomination this campaign will accept donations in.
     * @param _campaignName The String for the Campaign Name. Max 32 Bytes.
     * @param _metadataCid The CID to the metadata for campaign
     * @param _minAmountContribution The minimum amount of Token to be accepted for the campaign
     * @param _targetAmount The total amount of token which this campaign needs to achieve.
     * @param _category The number category which will provide the type of category of this Campaign
     * @param _validUntil The amount of seconds after this this campaign will get expired.
     * @return uint256 Returns the crowdfunding index for newly created campaign.
     */
    function createCampaign(
        address _campaignAdmin,
        address _tokenAddress,
        bytes32 _campaignName,
        string memory _metadataCid,
        uint256 _minAmountContribution,
        uint256 _targetAmount,
        uint16 _category,
        uint256 _validUntil
    ) external returns (uint256) {
        require(
            allowedERC20Tokens[IERC20(_tokenAddress)],
            "ERC20Token is not allowed for denomination"
        );

        require(allowedAddresses[msg.sender], "Not allowed to create Campaign");

        Crowdfunding memory campaign = Crowdfunding(
            _campaignAdmin,
            _tokenAddress,
            _campaignName,
            _metadataCid,
            _minAmountContribution,
            _targetAmount,
            0,
            _category,
            false,
            false,
            block.timestamp + _validUntil
        );
        uint256 _campaignCounter = _crowdfundingsCounter.current();
        crowdfundingCampaigns[_campaignCounter] = campaign;
        _crowdfundingsCounter.increment();

        emit CampaignCreated(
            _campaignAdmin,
            _tokenAddress,
            _campaignName,
            _metadataCid,
            _minAmountContribution,
            _targetAmount,
            _category,
            _validUntil
        );
        return (_campaignCounter);
    }

    /**
     * @notice You are donating on Grassroot Crowdfunding platform.
     * @param _campaignId Campaign Id of the ID which you will donate
     */
    function donate(uint256 _campaignId, uint256 _amountDonating) external {
        Crowdfunding memory campaign = crowdfundingCampaigns[_campaignId];

        require(
            campaign._campaignAdmin != address(0),
            "Campaign doesn't exists!!!"
        );
        require(!campaign._isCompleted, "Campaign is expired!!");

        require(
            campaign._minAmountContribution <= _amountDonating,
            "Amount donating is less that minimum amount donation for crowdfunding campaign"
        );

        uint256 allowance = IERC20(campaign._tokenAddress).allowance(
            msg.sender,
            address(this)
        );

        require(
            allowance >= _amountDonating,
            "Grassroot Crowdfunding contract doesn't have enough allowance"
        );

        // Have transfer logic here
        bool success = IERC20(campaign._tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amountDonating
        );

        require(
            success,
            "Failed to transfer amount from token to this contract."
        );

        // Update the token details
        campaign._tokenCollected += _amountDonating;

        if (block.timestamp >= campaign._validUntil) {
            // Check if campaign is completed.
            campaign._isCompleted = true;
            emit CampaignCompleted(_campaignId, block.timestamp, block.number);
        }

        // Reupdate mapping for crowdfunding
        crowdfundingCampaigns[_campaignId] = campaign;

        emit Donated(
            msg.sender,
            _campaignId,
            _amountDonating,
            campaign._tokenAddress
        );
    }

    function withdrawCampaign(uint256 _campaignId) external {
        Crowdfunding memory campaign = crowdfundingCampaigns[_campaignId];

        require(campaign._isCompleted, "Campaign is not completed.");
        require(
            campaign._campaignAdmin == msg.sender,
            "Sender is not campaign admin."
        );

        require(
            campaign._tokenCollected >= campaign._targetAmount,
            "Campaign Goal is not reached!!!"
        );

        require(!campaign._isRedeemed, "Campaign is Already Redeemed!!");

        bool success = IERC20(campaign._tokenAddress).transfer(
            msg.sender,
            campaign._tokenCollected
        );

        require(success, "Failed to tranfer amount to the campaign admin.");

        // Update the campaign
        campaign._isRedeemed = true;
        campaign._isCompleted = true;

        crowdfundingCampaigns[_campaignId] = campaign;

        emit CampaignRedeemed(
            _campaignId,
            msg.sender,
            campaign._tokenAddress,
            campaign._tokenCollected
        );
    }

    // View Functions
    function getCampaignValues(
        uint256 _idx
    )
        public
        view
        returns (
            address _campaignAdmin,
            address _tokenAddress,
            bytes32 _campaignName,
            string memory _metadataCid,
            uint256 _minAmountContribution,
            uint256 _targetAmount,
            uint256 _tokenCollected,
            uint16 _category,
            bool _isCompleted,
            bool _isRedeemed,
            uint256 _validUntil
        )
    {
        Crowdfunding memory campaign = crowdfundingCampaigns[_idx];
        require(
            campaign._campaignAdmin != address(0),
            "Campiagn doesn't exists!!!"
        );

        return (
            campaign._campaignAdmin,
            campaign._tokenAddress,
            campaign._campaignName,
            campaign._metadataCid,
            campaign._minAmountContribution,
            campaign._targetAmount,
            campaign._tokenCollected,
            campaign._category,
            campaign._isCompleted,
            campaign._isRedeemed,
            campaign._validUntil
        );
    }

    /**
     * @param _from From index you want to query
     * @param _to Upto which index you want to query
     */
    function getCampaignsInIdxRange(
        uint256 _from,
        uint256 _to
    ) external view returns (bytes[] memory) {
        uint256 _currentTokenId = _crowdfundingsCounter.current();

        require(
            _to <= _currentTokenId && _from < _to,
            "Index are not in range!!"
        );

        uint256 _uptoIdx = _to - _from;

        bytes[] memory campaigns = new bytes[](_uptoIdx);

        for (uint256 _idx = 0; _idx < _uptoIdx; _idx++) {
            uint256 _getIdx = _idx + _from;
            (
                address _campaignAdmin,
                address _tokenAddress,
                bytes32 _campaignName,
                string memory _metadataCid,
                uint256 _minAmountContribution,
                uint256 _targetAmount,
                uint256 _tokenCollected,
                uint16 _category,
                bool _isCompleted,
                bool _isRedeemed,
                uint256 _validUntil
            ) = getCampaignValues(_getIdx);

            campaigns[_idx] = abi.encode(
                _campaignAdmin,
                _tokenAddress,
                _campaignName,
                _metadataCid,
                _minAmountContribution,
                _targetAmount,
                _tokenCollected,
                _category,
                _isCompleted,
                _isRedeemed,
                _validUntil
            );
        }

        return campaigns;
    }
}
