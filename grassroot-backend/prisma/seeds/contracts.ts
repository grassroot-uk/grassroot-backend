import { PrismaClient } from '@prisma/client';

const createContracts = async (prisma: PrismaClient) => {
  const contracts = [
    {
      address: '0xc9C9637035A390B2c6f3E99F54AF0BC4c14b6765',
      name: 'Grassroot DAO',
      networkName: 'Matic Mumbai',
      networkSlug: 'maticmum',
      chainId: 80001,
      explorerUrl: 'https://mumbai.polygonscan.com/',
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'previousAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'AdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'beacon',
              type: 'address',
            },
          ],
          name: 'BeaconUpgraded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'campaignId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
          ],
          name: 'CampaignCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'metadata',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'admin',
              type: 'address',
            },
          ],
          name: 'DAOCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'metadata',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'admin',
              type: 'address',
            },
          ],
          name: 'DAOUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'member',
              type: 'address',
            },
          ],
          name: 'MembershipGranted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'adminAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'member',
              type: 'address',
            },
          ],
          name: 'MembershipRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'previousAdminRole',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'newAdminRole',
              type: 'bytes32',
            },
          ],
          name: 'RoleAdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleGranted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'Upgraded',
          type: 'event',
        },
        {
          inputs: [],
          name: 'ADMIN_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'OWNER_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_daosCounter',
          outputs: [
            {
              internalType: 'uint256',
              name: '_value',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'campaignToDaos',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              internalType: 'bytes32',
              name: '_campaignName',
              type: 'bytes32',
            },
            {
              internalType: 'string',
              name: '_metadataCid',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_minAmountContribution',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_targetAmount',
              type: 'uint256',
            },
            {
              internalType: 'uint16',
              name: '_category',
              type: 'uint16',
            },
            {
              internalType: 'uint256',
              name: '_validUntil',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_daoId',
              type: 'uint256',
            },
          ],
          name: 'createCampaign',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_metadata',
              type: 'string',
            },
          ],
          name: 'createDao',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'crowdfundingContract',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'daos',
          outputs: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'metadata',
              type: 'string',
            },
            {
              internalType: 'address',
              name: 'admin',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_fromIdx',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_toIdx',
              type: 'uint256',
            },
          ],
          name: 'getDAOs',
          outputs: [
            {
              internalType: 'bytes[]',
              name: '',
              type: 'bytes[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_daoId',
              type: 'uint256',
            },
          ],
          name: 'getMembership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
          ],
          name: 'getRoleAdmin',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_daoId',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '_newMember',
              type: 'address',
            },
          ],
          name: 'grantMembership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'hasRole',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'memberships',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'daoId',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: '_metadata',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
          ],
          name: 'modifyDao',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_daoId',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: '_metadata',
              type: 'string',
            },
          ],
          name: 'modifyMetadata',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'proxiableUUID',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_daoId',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '_revokedAddress',
              type: 'address',
            },
          ],
          name: 'revokeMembership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_crowdfundingAddress',
              type: 'address',
            },
          ],
          name: 'setCrowdfundingContract',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
          ],
          name: 'upgradeTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeToAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ],
    },
    {
      address: '0x076c043bffB56F75dae2aba1E2a889F193A84cDF',
      name: 'Grassroot Campaigns',
      networkName: 'Matic Mumbai',
      networkSlug: 'maticmum',
      chainId: 80001,
      explorerUrl: 'https://mumbai.polygonscan.com/',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_trustedForwarder',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'previousAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'AdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'beacon',
              type: 'address',
            },
          ],
          name: 'BeaconUpgraded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: '_campaignId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_completedAt',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_blockNumber',
              type: 'uint256',
            },
          ],
          name: 'CampaignCompleted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bytes32',
              name: '_campaignName',
              type: 'bytes32',
            },
            {
              indexed: false,
              internalType: 'string',
              name: '_metadataCid',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_minAmountContribution',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_targetAmount',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint16',
              name: '_category',
              type: 'uint16',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_validUntil',
              type: 'uint256',
            },
          ],
          name: 'CampaignCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: '_campaignId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_tokenRedeemed',
              type: 'uint256',
            },
          ],
          name: 'CampaignRedeemed',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: '_donater',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_campaignId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_donated',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: '_tokenaddress',
              type: 'address',
            },
          ],
          name: 'Donated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'previousAdminRole',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'newAdminRole',
              type: 'bytes32',
            },
          ],
          name: 'RoleAdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleGranted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'Upgraded',
          type: 'event',
        },
        {
          inputs: [],
          name: 'ADMIN_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'UPGRADER_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_crowdfundingsCounter',
          outputs: [
            {
              internalType: 'uint256',
              name: '_value',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_newAllowedAddress',
              type: 'address',
            },
          ],
          name: 'addAllowedAddress',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'erc20Token',
              type: 'address',
            },
          ],
          name: 'allowERC20Token',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'allowedAddresses',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'contract IERC20',
              name: '',
              type: 'address',
            },
          ],
          name: 'allowedERC20Tokens',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              internalType: 'bytes32',
              name: '_campaignName',
              type: 'bytes32',
            },
            {
              internalType: 'string',
              name: '_metadataCid',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_minAmountContribution',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_targetAmount',
              type: 'uint256',
            },
            {
              internalType: 'uint16',
              name: '_category',
              type: 'uint16',
            },
            {
              internalType: 'uint256',
              name: '_validUntil',
              type: 'uint256',
            },
          ],
          name: 'createCampaign',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'crowdfundingCampaigns',
          outputs: [
            {
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              internalType: 'bytes32',
              name: '_campaignName',
              type: 'bytes32',
            },
            {
              internalType: 'string',
              name: '_metadataCid',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_minAmountContribution',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_targetAmount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_tokenCollected',
              type: 'uint256',
            },
            {
              internalType: 'uint16',
              name: '_category',
              type: 'uint16',
            },
            {
              internalType: 'bool',
              name: '_isCompleted',
              type: 'bool',
            },
            {
              internalType: 'bool',
              name: '_isRedeemed',
              type: 'bool',
            },
            {
              internalType: 'uint256',
              name: '_validUntil',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_campaignId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_amountDonating',
              type: 'uint256',
            },
          ],
          name: 'donate',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_idx',
              type: 'uint256',
            },
          ],
          name: 'getCampaignValues',
          outputs: [
            {
              internalType: 'address',
              name: '_campaignAdmin',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_tokenAddress',
              type: 'address',
            },
            {
              internalType: 'bytes32',
              name: '_campaignName',
              type: 'bytes32',
            },
            {
              internalType: 'string',
              name: '_metadataCid',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_minAmountContribution',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_targetAmount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_tokenCollected',
              type: 'uint256',
            },
            {
              internalType: 'uint16',
              name: '_category',
              type: 'uint16',
            },
            {
              internalType: 'bool',
              name: '_isCompleted',
              type: 'bool',
            },
            {
              internalType: 'bool',
              name: '_isRedeemed',
              type: 'bool',
            },
            {
              internalType: 'uint256',
              name: '_validUntil',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_from',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_to',
              type: 'uint256',
            },
          ],
          name: 'getCampaignsInIdxRange',
          outputs: [
            {
              internalType: 'bytes[]',
              name: '',
              type: 'bytes[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
          ],
          name: 'getRoleAdmin',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'hasRole',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'forwarder',
              type: 'address',
            },
          ],
          name: 'isTrustedForwarder',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'proxiableUUID',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'erc20Token',
              type: 'address',
            },
          ],
          name: 'removeERC20Token',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_address',
              type: 'address',
            },
          ],
          name: 'revokeAllowedAddress',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
          ],
          name: 'upgradeTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeToAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_campaignId',
              type: 'uint256',
            },
          ],
          name: 'withdrawCampaign',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
    {
      address: '0x7163e7B49F2D3bbeed78Ec8FD40Ec93621E0dd15',
      name: 'Sample USDC',
      networkName: 'Matic Mumbai',
      networkSlug: 'maticmum',
      chainId: 80001,
      explorerUrl: 'https://mumbai.polygonscan.com/',
      abi: [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_symbol',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'buy',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'subtractedValue',
              type: 'uint256',
            },
          ],
          name: 'decreaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'addedValue',
              type: 'uint256',
            },
          ],
          name: 'increaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint96',
              name: 'newRatio',
              type: 'uint96',
            },
          ],
          name: 'setRatio',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'withdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
  ];

  await prisma.contract.createMany({
    data: contracts,
  });
};

export { createContracts };
