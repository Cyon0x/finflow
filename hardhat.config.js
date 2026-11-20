require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const arcNetworks = require("./config/arc-networks.json");

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const accounts =
  DEPLOYER_PRIVATE_KEY && DEPLOYER_PRIVATE_KEY.startsWith("0x") && DEPLOYER_PRIVATE_KEY.length === 66
    ? [DEPLOYER_PRIVATE_KEY]
    : [];

/** @type {import("hardhat/config").HardhatUserConfig} */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    arcMainnet: {
      url: process.env.ARC_MAINNET_RPC_URL || arcNetworks.mainnet.rpcUrl,
      chainId: arcNetworks.mainnet.chainId,
      accounts,
    },
    arcTestnet: {
      url: process.env.ARC_TESTNET_RPC_URL || arcNetworks.testnet.rpcUrl,
      chainId: arcNetworks.testnet.chainId,
      accounts,
    },
  },
  etherscan: {
    apiKey: { arcMainnet: "not-needed-for-blockscout", arcTestnet: "not-needed-for-blockscout" },
    customChains: [
      {
        network: "arcMainnet",
        chainId: arcNetworks.mainnet.chainId,
        urls: {
          apiURL: `${arcNetworks.mainnet.explorerUrl}/api`,
          browserURL: arcNetworks.mainnet.explorerUrl,
        },
      },
      {
        network: "arcTestnet",
        chainId: 5042002,
        urls: {
          apiURL: `${arcNetworks.testnet.explorerUrl}/api`,
          browserURL: arcNetworks.testnet.explorerUrl,
        },
      },
    ],
  },
};
