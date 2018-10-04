/* eslint-disable max-len */
const replicationResult = require('./../replicationResult.json');
const Utilities = require('./../modules/Utilities');
require('dotenv').config();
const _ = require('lodash-uuid');

if (_.isUuid4(replicationResult.replication_id)) {
    console.log('replication_id is OK');
} else {
    console.log('replication_id is not OK');
}

