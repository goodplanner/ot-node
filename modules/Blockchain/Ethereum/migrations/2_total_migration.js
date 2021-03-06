var BN = require('bn.js');

var TracToken = artifacts.require('TracToken'); // eslint-disable-line no-undef

var Hub = artifacts.require('Hub'); // eslint-disable-line no-undef
var Profile = artifacts.require('Profile'); // eslint-disable-line no-undef
var Holding = artifacts.require('Holding'); // eslint-disable-line no-undef
var Reading = artifacts.require('Reading'); // eslint-disable-line no-undef
var Approval = artifacts.require('Approval'); // eslint-disable-line no-undef

var ProfileStorage = artifacts.require('ProfileStorage'); // eslint-disable-line no-undef
var HoldingStorage = artifacts.require('HoldingStorage'); // eslint-disable-line no-undef

var MockHolding = artifacts.require('MockHolding'); // eslint-disable-line no-undef
var MockApproval = artifacts.require('MockApproval'); // eslint-disable-line no-undef
var TestingUtilities = artifacts.require('TestingUtilities'); // eslint-disable-line no-undef


const amountToMint = (new BN(5)).mul((new BN(10)).pow(new BN(30)));

module.exports = async (deployer, network, accounts) => {
    let hub;
    let token;

    let profile;
    let holding;
    let reading;
    let approval;

    let profileStorage;
    let holdingStorage;

    var amounts = [];
    var recepients = [];

    switch (network) {
    case 'test':
        await deployer.deploy(TestingUtilities);

        await deployer.deploy(Hub, { gas: 6000000, from: accounts[0] })
            .then((result) => {
                hub = result;
            });

        profileStorage = await deployer.deploy(
            ProfileStorage,
            hub.address, { gas: 6000000, from: accounts[0] },
        );
        await hub.setProfileStorageAddress(profileStorage.address);

        holdingStorage = await deployer.deploy(
            HoldingStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setHoldingStorageAddress(holdingStorage.address);

        approval = await deployer.deploy(MockApproval);
        await hub.setApprovalAddress(approval.address);

        token = await deployer.deploy(TracToken, accounts[0], accounts[1], accounts[2]);
        await hub.setTokenAddress(token.address);

        profile = await deployer.deploy(Profile, hub.address, { gas: 9000000, from: accounts[0] });
        await hub.setProfileAddress(profile.address);

        holding = await deployer.deploy(Holding, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setHoldingAddress(holding.address);

        reading = await deployer.deploy(Reading, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setReadingAddress(reading.address);

        for (let i = 0; i < 10; i += 1) {
            amounts.push(amountToMint);
            recepients.push(accounts[i]);
        }
        await token.mintMany(recepients, amounts, { from: accounts[0] });
        await token.finishMinting({ from: accounts[0] });

        break;
    case 'ganache':
        await deployer.deploy(Hub, { gas: 6000000, from: accounts[0] })
            .then((result) => {
                hub = result;
            });

        profileStorage = await deployer.deploy(
            ProfileStorage,
            hub.address, { gas: 6000000, from: accounts[0] },
        );
        await hub.setProfileStorageAddress(profileStorage.address);

        holdingStorage = await deployer.deploy(
            HoldingStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setHoldingStorageAddress(holdingStorage.address);

        approval = await deployer.deploy(Approval);
        await hub.setApprovalAddress(approval.address);

        token = await deployer.deploy(TracToken, accounts[0], accounts[1], accounts[2]);
        await hub.setTokenAddress(token.address);

        profile = await deployer.deploy(Profile, hub.address, { gas: 9000000, from: accounts[0] });
        await hub.setProfileAddress(profile.address);

        holding = await deployer.deploy(Holding, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setHoldingAddress(holding.address);

        reading = await deployer.deploy(Reading, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setReadingAddress(reading.address);

        for (let i = 0; i < 10; i += 1) {
            amounts.push(amountToMint);
            recepients.push(accounts[i]);
        }
        await token.mintMany(recepients, amounts, { from: accounts[0] });
        await token.finishMinting({ from: accounts[0] });

        console.log('\n\n \t Contract adressess on ganache:');
        console.log(`\t Hub contract address: \t\t\t${hub.address}`);
        console.log(`\t Approval contract address: \t\t${approval.address}`);
        console.log(`\t Token contract address: \t\t${token.address}`);
        console.log(`\t Profile contract address: \t\t${profile.address}`);
        console.log(`\t Holding contract address: \t\t${holding.address}`);

        console.log(`\t ProfileStorage contract address: \t${profileStorage.address}`);
        console.log(`\t HoldingStorage contract address: \t${holdingStorage.address}`);

        break;
    case 'mock':

        await deployer.deploy(TracToken, accounts[0], accounts[1], accounts[2])
            .then(result => token = result);
        holding = await deployer.deploy(MockHolding);

        for (var i = 0; i < 10; i += 1) {
            amounts.push(amountToMint);
            recepients.push(accounts[i]);
        }
        await token.mintMany(recepients, amounts, { from: accounts[0] });

        console.log('\n\n \t Contract adressess on ganache (mock versions):');
        console.log(`\t Token contract address: \t${token.address}`);
        console.log(`\t Escrow contract address: \t${holding.address}`);
        break;
    case 'update':
        hub = await Hub.deployed();

        token = await deployer.deploy(TracToken, accounts[0], accounts[1], accounts[2]);
        await hub.setTokenAddress(token.address);

        profile = await deployer.deploy(Profile, hub.address, { gas: 9000000, from: accounts[0] });
        await hub.setProfileAddress(profile.address);

        holding = await deployer.deploy(Holding, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setHoldingAddress(holding.address);

        reading = await deployer.deploy(Reading, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setReadingAddress(reading.address);

        for (let i = 0; i < 10; i += 1) {
            amounts.push(amountToMint);
            recepients.push(accounts[i]);
        }
        await token.mintMany(recepients, amounts, { from: accounts[0] });
        await token.finishMinting({ from: accounts[0] });

        console.log('\n\n \t Contract adressess on ganache:');
        console.log(`\t Hub contract address: \t\t\t${hub.address}`);
        console.log(`\t Approval contract address: \t\t${approval.address}`);
        console.log(`\t Token contract address: \t\t${token.address}`);
        console.log(`\t Profile contract address: \t\t${profile.address}`);
        console.log(`\t Holding contract address: \t\t${holding.address}`);
        break;
    case 'rinkeby':
        await deployer.deploy(Hub, { gas: 6000000, from: accounts[0] })
            .then((result) => {
                hub = result;
            });

        await hub.setTokenAddress('0x98d9a611ad1b5761bdc1daac42c48e4d54cf5882');

        profileStorage = await deployer.deploy(
            ProfileStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setProfileStorageAddress(profileStorage.address);

        holdingStorage = await deployer.deploy(
            HoldingStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setHoldingStorageAddress(holdingStorage.address);

        profile = await deployer.deploy(Profile, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setProfileAddress(profile.address);

        holding = await deployer.deploy(Holding, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setHoldingAddress(holding.address);

        approval = await deployer.deploy(Approval, { gas: 6000000, from: accounts[0] });
        await hub.setApprovalAddress(approval.address);

        console.log('\n\n \t Contract adressess on rinkeby:');
        console.log(`\t Hub contract address: \t\t\t${hub.address}`);
        console.log(`\t Profile contract address: \t\t${profile.address}`);
        console.log(`\t Holding contract address: \t\t${holding.address}`);
        console.log(`\t Approval contract address: \t\t${approval.address}`);

        console.log(`\t ProfileStorage contract address: \t${profileStorage.address}`);
        console.log(`\t HoldingStorage contract address: \t${holdingStorage.address}`);

        break;
    case 'live':
        await deployer.deploy(Hub, { gas: 6000000, from: accounts[0] })
            .then((result) => {
                hub = result;
            });

        await hub.setTokenAddress('0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F');

        profileStorage = await deployer.deploy(
            ProfileStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setProfileStorageAddress(profileStorage.address);

        holdingStorage = await deployer.deploy(
            HoldingStorage,
            hub.address,
            { gas: 6000000, from: accounts[0] },
        );
        await hub.setHoldingStorageAddress(holdingStorage.address);

        profile = await deployer.deploy(Profile, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setProfileAddress(profile.address);

        holding = await deployer.deploy(Holding, hub.address, { gas: 6000000, from: accounts[0] });
        await hub.setHoldingAddress(holding.address);

        approval = await deployer.deploy(Approval, { gas: 6000000, from: accounts[0] });
        await hub.setApprovalAddress(approval.address);

        console.log('\n\n \t Contract adressess on mainnet:');
        console.log(`\t Hub contract address: \t\t\t${hub.address}`);
        console.log(`\t Profile contract address: \t\t${profile.address}`);
        console.log(`\t Holding contract address: \t\t${holding.address}`);
        console.log(`\t Approval contract address: \t\t${approval.address}`);

        console.log(`\t ProfileStorage contract address: \t${profileStorage.address}`);
        console.log(`\t HoldingStorage contract address: \t${holdingStorage.address}`);

        break;
    default:
        console.warn('Please use one of the following network identifiers: ganache, mock, test, or rinkeby');
        break;
    }
};
