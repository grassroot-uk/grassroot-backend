// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./ICrowdFunding.sol";

contract DAOS is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _daosCounter;

    /// Structures
    struct DAO {
        string name;
        string description;
        string metadata;
        address admin;
    }

    address public crowdfundingContract;
    mapping(uint256 => DAO) public daos;
    mapping(uint256 => uint256) campaignToDaos;

    /// Events
    event DAOCreated(
        uint256 daoId,
        string name,
        string description,
        string metadata,
        address admin
    );
    
    event DAOUpdated(
        uint256 daoId,
        string name,
        string description,
        string metadata,
        address admin
    );

    event CampaignLinked(uint256 campaignId, uint256 daoId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
        _setRoleAdmin(OWNER_ROLE, ADMIN_ROLE);
    }

    // Only ADMIN Functions
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    function setCrowdfundingContract(
        address _crowdfundingAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        crowdfundingContract = _crowdfundingAddress;
    }

    // External Functions

    /// Create a DAO
    function createDao(
        string memory _name,
        string memory _description,
        string memory _metadata
    ) external {
        require(msg.sender != address(0), "Not a valid sender");

        DAO memory newDao;
        newDao.admin = msg.sender;
        newDao.name = _name;
        newDao.description = _description;
        newDao.metadata = _metadata;

        uint256 daoId = _daosCounter.current();
        _daosCounter.increment();

        daos[daoId] = newDao;

        // Grant role to sender.
        _grantRole(OWNER_ROLE, msg.sender);

        emit DAOCreated(daoId, _name, _description, _metadata, msg.sender);
    }

    /// Create a campaign
    function createCampaign(
        address _campaignAdmin,
        address _tokenAddress,
        bytes32 _campaignName,
        string memory _metadataCid,
        uint256 _minAmountContribution,
        uint256 _targetAmount,
        uint16 _category,
        uint256 _validUntil,
        uint256 _daoId
    ) external onlyRole(OWNER_ROLE) {
        require(
            crowdfundingContract != address(0),
            "Campaign contract not yet set!!"
        );

        DAO memory tobeUpdatedDao = daos[_daoId];

        require(
            tobeUpdatedDao.admin == msg.sender,
            "Not the DAO owner, Create a DAO first!!"
        );

        // Do XCC Stuff
        CrowdfundingCampaign c = CrowdfundingCampaign(crowdfundingContract);
        uint256 campaignId = c.createCampaign(
            _campaignAdmin,
            _tokenAddress,
            _campaignName,
            _metadataCid,
            _minAmountContribution,
            _targetAmount,
            _category,
            _validUntil
        );

        require(campaignId > 0, "Campaign not created!!");

        campaignToDaos[campaignId] = _daoId;
        // Emit EVENT and Update Some Mapping
        emit CampaignLinked(campaignId, _daoId);
    }

    /// Modify DAO
    function modifyDao(
        uint256 daoId,
        string memory _metadata,
        string memory _name,
        string memory _description
    ) external onlyRole(OWNER_ROLE) {
        // Get the Dao
        // Check for admin with msg.sender
        // Update
        DAO memory tobeUpdatedDao = daos[daoId];

        require(tobeUpdatedDao.admin == msg.sender, "Not the DAO Owner!!");

        tobeUpdatedDao.name = _name;
        tobeUpdatedDao.description = _description;
        tobeUpdatedDao.metadata = _metadata;

        // Repush
        daos[daoId] = tobeUpdatedDao;

        emit DAOUpdated(daoId, _name, _description, _metadata, msg.sender);
    }

    /// Modify Metadata
    function modifyMetadata(
        uint256 _daoId,
        string memory _metadata
    ) external onlyRole(OWNER_ROLE) {
        // Update Metadata
        // Check for admin with msg.sender
        DAO memory tobeUpdatedDao = daos[_daoId];

        require(tobeUpdatedDao.admin == msg.sender, "Not the DAO Owner!!");

        tobeUpdatedDao.metadata = _metadata;

        emit DAOUpdated(
            _daoId,
            tobeUpdatedDao.name,
            tobeUpdatedDao.description,
            _metadata,
            msg.sender
        );
    }

    /// View Functions

    function getDAOs(
        uint256 _fromIdx,
        uint256 _toIdx
    ) public view returns (bytes[] memory) {
        uint256 _currentTokenId = _daosCounter.current();

        require(
            _toIdx <= _currentTokenId && _fromIdx < _toIdx,
            "Index are not in range!!"
        );

        uint256 _uptoIdx = _toIdx - _fromIdx;

        bytes[] memory returndaos = new bytes[](_uptoIdx);

        for (uint256 _idx = 0; _idx < _uptoIdx; _idx++) {
            uint256 _daoId = _idx + _fromIdx;
            DAO memory _dao = daos[_daoId];

            returndaos[_idx] = abi.encode(
                _daoId,
                _dao.name,
                _dao.description,
                _dao.metadata,
                _dao.admin
            );
        }

        return (returndaos);
    }
}
