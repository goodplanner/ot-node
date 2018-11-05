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
const amountToSupplyBootstraps = new BN(300);
const amountToSupplyNodes = new BN(2000);

function toStep(amount) {
    return (new BN(10)).pow(new BN(18)).mul(amount);
}

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

    var hubAddress = null;
    var secureWallet = null;
    var approvalAddress;
    var nodeIds;
    var identities;
    var promises;
    var wallets;
    var res;

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
    case 'approve':
        console.log('Getting hub');
        hub = await Hub.at('0x6A3a6A5C980cc042B14c201807E71B996C23D032');
        console.log(`Hub received: ${hub.address}`);

        approvalAddress = await hub.approvalAddress.call();
        console.log(`Approval address: ${approvalAddress}`);

        approval = await Approval.at(approvalAddress);
        console.log(`Approval received: ${approvalAddress}`);

        // Insert erc725 addresses in identities array (normalized)
        identities = [
            '0x18BD3F6e26fb0DaFdE48775560dFFbfD108bc719',
        ];
        // Insert node identities here (denormalized)
        nodeIds = [
            '1bfbe7fc48ea81ed52df1ad7372a04f6d8dc67da',
        ];

        for (let i = 0; i < nodeIds.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await approval.approve(identities[i], `0x${nodeIds[i]}`, new BN(0));
        }

        break;
    case 'supplylive':
        token = await TracToken.at('0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f');

        wallets = [
            '0x290723804ec14861a10B1738bC1Af5E6215288B1',
            '0x83a04AFcaAA903a2A5426c2a24DE64761428b84f',
            '0x504cD3aa24c3f0959BC5D7958Bba0ef92c7FCc96',
            '0x9B3F8Fb9FA32E1c6596cB863D0cF79B531a9F912',
            '0x387Bd50dCf85ad3d01dff125F4ff4CfBE548dbE0',
            '0x7784683D1e3d2068960146b2471bbc8f32d9aa8e',
            '0x35B3Fccf89B065060BB3aBC3ecef1DAfB98715E1',
            '0x333C82508CcC34A914096A668c2CBBcA68142aA9',
        ];

        for (let i = 0; i < 2; i += 1) {
            console.log(`Sending ${amountToSupplyBootstraps.toString()} TRAC to bootstrap nodes`);
            // eslint-disable-next-line no-await-in-loop
            await token.transfer(wallets[i], toStep(amountToSupplyBootstraps));
        }
        console.log(`Sent ${amountToSupplyBootstraps.toString()} TRAC to bootstrap nodes`);


        for (let i = 2; i < wallets.length; i += 1) {
            console.log(`Sending ${amountToSupplyNodes.toString()} TRAC to network nodes`);
            // eslint-disable-next-line no-await-in-loop
            await token.transfer(wallets[i], toStep(amountToSupplyNodes));
        }
        console.log(`Sent ${amountToSupplyNodes.toString()} TRAC to network nodes`);
        break;
    case 'approvelive':
        console.log('Getting hub');
        if (hubAddress == null) {
            console.log('Please set hub address before sending approval');
            break;
        }
        hub = await Hub.at(hubAddress);
        console.log(`Hub received: ${hub.address}`);

        approvalAddress = await hub.approvalAddress.call();
        console.log(`Approval address: ${approvalAddress}`);

        approval = await Approval.at(approvalAddress);
        console.log(`Approval received: ${approvalAddress}`);

        // Insert erc725 identities in identities array
        identities = [
            '0x43914e3f2e92ef214b9d0974639ade385946b907',
        ];
        // Insert node identities here (don't forget to prepend 0x)
        nodeIds = [
            'caadbbaf88ab45aa20fefc96acd80335670356b3',
        ];

        for (let i = 0; i < nodeIds.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await approval.approve(identities[i], `0x${nodeIds[i]}`, new BN(0));
        }

        break;
    case 'transferlive':
        console.log('Getting hub');
        if (hubAddress == null || secureWallet == null) {
            console.log('Please set hub address before sending approval');
            break;
        }
        hub = await Hub.at(hubAddress);

        await hub.transferOwnership(secureWallet);
        console.log(`Set ${secureWallet} as new contract owner`);
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
