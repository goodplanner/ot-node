/* eslint-disable max-len */
const postResult = require('./importResult.json');
const Utilities = require('./modules/Utilities');
require('dotenv').config();

if (!Utilities.isHexStrict(postResult.import_hash) || Utilities.isZeroHash(postResult.import_hash)) {
    console.log('import_hash is not OK');
    process.exit(-1);
} else {
    console.log('import_hash is OK');
}

if (!Utilities.isHexStrict(postResult.import_id) || Utilities.isZeroHash(postResult.import_id)) {
    console.log('import_id is not OK');
    process.exit(-1);
} else {
    console.log('import_id is OK');
}

if (postResult.message !== 'Import success') {
    console.log('message is not OK');
    process.exit(-1);
} else {
    console.log('message is OK');
}

// TODO
// if (postResult.wallet !== process.env.NODE_WALLET) {
//     console.log('wallet is not OK');
//     process.exit(-1);
// } else {
//     console.log('wallet is OK');
// }
