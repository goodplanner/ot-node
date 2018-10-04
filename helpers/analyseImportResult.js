/* eslint-disable max-len */
const importResult = require('./../importResult.json');
const Utilities = require('./../modules/Utilities');
require('dotenv').config();

if (!Utilities.isHexStrict(importResult.import_hash) || Utilities.isZeroHash(importResult.import_hash)) {
    console.log('import_hash is not OK');
    process.exit(-1);
} else {
    console.log('import_hash is OK');
}

if (!Utilities.isHexStrict(importResult.import_id) || Utilities.isZeroHash(importResult.import_id)) {
    console.log('import_id is not OK');
    process.exit(-1);
} else {
    console.log('import_id is OK');
}

if (importResult.message !== 'Import success') {
    console.log('message is not OK');
    process.exit(-1);
} else {
    console.log('message is OK');
}

// TODO
// if (importResult.wallet !== process.env.NODE_WALLET) {
//     console.log('wallet is not OK');
//     process.exit(-1);
// } else {
//     console.log('wallet is OK');
// }
