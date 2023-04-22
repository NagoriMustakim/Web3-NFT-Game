require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL,
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: process.env.AVALANCHE_PRIVATE_KEY !== undefined ? [process.env.AVALANCHE_PRIVATE_KEY] : [],
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: process.env.METAMASK_PRIVATE_KEY !== undefined ? [process.env.METAMASK_PRIVATE_KEY] : [],
      chainId: 5
    },
    mumbai: {
      url: process.env.POLYGON_RPC_URl,
      accounts: process.env.METAMASK_PRIVATE_KEY !== undefined ? [process.env.METAMASK_PRIVATE_KEY] : [],
      chainId: 80001,
      gasPrice: 8000000000,
      gas: 12450000,
      timeout: 60000,
      websockets: true,
    },
    // subnet: {
    //   url: process.env.NODE_URL,
    //   chainId: Number(process.env.CHAIN_ID),
    //   gasPrice: 'auto',
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  etherscan: {
    apiKey: {
      mumbai: process.env.POLYGON_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
    }

  }
}



