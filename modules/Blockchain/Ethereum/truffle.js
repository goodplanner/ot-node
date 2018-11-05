const result = require('dotenv').config({ path: `${__dirname}/../../../.env` });
var HDWalletProvider = require('truffle-hdwallet-provider'); // eslint-disable-line import/no-unresolved

module.exports = {
    compilers: {
        solc: {
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    },

    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            gas: 4000000,
            network_id: '*', // Match any network id
        },

        ganache: {
            host: 'localhost',
            port: 7545,
            gas: 6000000,
            network_id: '5777',
        },

        update: {
            host: 'localhost',
            port: 7545,
            gas: 6000000,
            network_id: '5777',
        },

        test: {
            host: 'localhost',
            port: 7545,
            gas: 6000000,
            network_id: '5777',
        },

        mock: {
            host: 'localhost',
            port: 7545,
            gas: 6000000,
            network_id: '5777',
        },

        rinkeby: {
            host: 'localhost', // Connect to geth on the specified
            port: 8545,
            provider: () => new HDWalletProvider(process.env.TRUFFLE_MNEMONIC, `https://rinkeby.infura.io/${process.env.RINKEBY_ACCESS_KEY}`),
            network_id: 4,
            gas: 6000000, // Gas limit used for deploys
            websockets: true,
            skipDryRun: true,
        },

        supply: {
            host: 'localhost', // Connect to geth on the specified
            port: 8545,
            provider: () => new HDWalletProvider(process.env.TRUFFLE_MNEMONIC, `https://rinkeby.infura.io/${process.env.RINKEBY_ACCESS_KEY}`),
            network_id: 4,
            gas: 2000000, // Gas limit used for calls
            websockets: true,
            skipDryRun: true,
        },

        approve: {
            host: 'localhost', // Connect to geth on the specified
            port: 8545,
            provider: () => new HDWalletProvider(process.env.TRUFFLE_MNEMONIC, `https://rinkeby.infura.io/${process.env.RINKEBY_ACCESS_KEY}`),
            network_id: 4,
            gas: 2000000, // Gas limit used for calls
            websockets: true,
            skipDryRun: true,
        },

        live: {
            host: 'localhost',
            port: 8545,
            provider: () => new HDWalletProvider(process.env.LIVE_MNEMONIC, `https://mainnet.infura.io/${process.env.LIVE_ACCESS_KEY}`),
            network_id: 1,
            gas: 6000000, // Gas limit used for deploys
            websockets: true,
            skipDryRun: true,
        },

        supplylive: {
            host: 'localhost',
            port: 8545,
            provider: () => new HDWalletProvider(process.env.LIVE_MNEMONIC, `https://mainnet.infura.io/${process.env.LIVE_ACCESS_KEY}`),
            network_id: 1,
            gas: 6000000, // Gas limit used for deploys
            websockets: true,
            skipDryRun: true,
        },

        approvelive: {
            host: 'localhost', // Connect to geth on the specified
            port: 8545,
            provider: () => new HDWalletProvider(process.env.LIVE_MNEMONIC, `https://mainnet.infura.io/${process.env.LIVE_ACCESS_KEY}`),
            network_id: 4,
            gas: 2000000, // Gas limit used for calls
            websockets: true,
            skipDryRun: true,
        },

        transferlive: {
            host: 'localhost', // Connect to geth on the specified
            port: 8545,
            provider: () => new HDWalletProvider(process.env.LIVE_MNEMONIC, `https://mainnet.infura.io/${process.env.LIVE_ACCESS_KEY}`),
            network_id: 4,
            gas: 2000000, // Gas limit used for calls
            websockets: true,
            skipDryRun: true,
        },
    },
};
