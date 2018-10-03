/* eslint-disable max-len */
const postResult = require('./postResult.json');
const Utilities = require('./modules/Utilities.js');
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
    process.env.IMPORT_ID = postResult.import_id;
    console.log(process.env.IMPORT_ID);
}

if (postResult.message !== 'Import success') {
    console.log('message is not OK');
    process.exit(-1);
} else {
    console.log('message is OK');
}

if (postResult.wallet !== process.env.NODE_WALLET) {
    console.log('wallet is not OK');
    process.exit(-1);
} else {
    console.log('wallet is OK');
}

