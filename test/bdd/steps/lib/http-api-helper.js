const request = require('request');
const fs = require('fs');
const path = require('path');

/**
 * @typedef {Object} ImportInfo
 * @property {string} data_provider_wallet Data provider wallet.
 * @property {Object} import Import object with vertices and edges.
 * @property {string} import_hash SHA3 of the import (sorted import object to JSON with padding 0).
 * @property {string} root_hash Merkle root-hash of the import (sorted import object).
 * @property {string} transaction Transaction hash of the write-fingerprint transaction.
 */

/**
 * Fetch /api/import_info?data_set_id={{data_set_id}}
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param dataSetId Data-set ID
 * @return {Promise.<ImportInfo>}
 */
async function apiImportInfo(nodeRpcUrl, dataSetId) {
    return new Promise((accept, reject) => {
        request(
            `${nodeRpcUrl}/api/import_info?data_set_id=${dataSetId}`,
            { json: true },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} FingerprintInfo
 * @property {string} root_hash Merkle root-hash of the import (sorted import object).
 */

/**
 * Fetch api/fingerprint?data_set_id={{data_set_id}}
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {string} jsonQuery
 * @return {Promise.<FingerprintInfo>}
 */
async function apiFingerprint(nodeRpcUrl, datSetId) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/fingerprint?data_set_id=${datSetId}`,
                json: true,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} Import
 * @property {string} data_set_id Data-set ID.
 * @property {string} message Message about successful import.
 * @property {string} wallet Data provider wallet.
 */

/**
 * Fetch /api/import
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {string} importFilePath
 * @param {string} importType
 * @return {Promise.<Import>}
 */
async function apiImport(nodeRpcUrl, importFilePath, importType) {
    return new Promise((accept, reject) => {
        request({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: `${nodeRpcUrl}/api/import`,
            json: true,
            formData: {
                importfile: fs.createReadStream(path.join(__dirname, '../../../../', importFilePath)),
                importtype: `${importType}`,
            },
        }, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            accept(body);
        });
    });
}

/**
 * @typedef {Object} ImportsInfo
 * @property {string} data_set_id Data-set ID.
 * @property {Number} total_documents Number of documents in inport.
 * @property {string} root_hash Merkle root-hash of the import (sorted import object).
 * @property {Number} data_size Size in bytes of whole import.
 * @property {string} transaction_hash Transaction hash of the write-fingerprint transaction.
 * @property {string} data_provider_wallet Wallet of initial data provider.
 */

/**
 * Fetch /api/imports_info
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @return {Promise.<[ImportsInfo]>}
 */
async function apiImportsInfo(nodeRpcUrl) {
    return new Promise((accept, reject) => {
        request({
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url: `${nodeRpcUrl}/api/imports_info`,
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            accept(body);
        });
    });
}

/**
 * Fetch /api/query/local response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {json} jsonQuery
 * @return {Promise.<[string]>}
 */
async function apiQueryLocal(nodeRpcUrl, jsonQuery) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/query/local`,
                json: true,
                body: jsonQuery,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} QueryLocalImportByDataSetId
 * @property {Array} edges arango edges
 * @property {Array} vertices arango vertices
 */

/**
 * Fetch /api/query/local/import/{{data_set_id}}
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {string} importId ID.
 * @return {Promise.<QueryLocalImportByDataSetId>}
 */
async function apiQueryLocalImportByDataSetId(nodeRpcUrl, importId) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/query/local/import/${importId}`,
                json: true,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} Replication
 * @property {string} data_set_id Data-set ID.
 * @property {string} replication_id Replication ID.
 */

/**
 * Fetch /api/replication response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param data_set_id Data-set ID
 * @return {Promise.<Replication>}
 */
async function apiReplication(nodeRpcUrl, data_set_id) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/replication`,
                json: true,
                body: {
                    data_set_id,
                },
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} NetworkQueryId
 * @property {string} message Human informative message about query status.
 * @property {string} query_id Network query ID.
 */

/**
 * Fetch api/query/network response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {json} jsonQuery
 * @return {Promise.<NetworkQueryId>}
 */
async function apiQueryNetwork(nodeRpcUrl, jsonQuery) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'POST',
                uri: `${nodeRpcUrl}/api/query/network`,
                json: true,
                body: jsonQuery,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * Fetch api/query/{{query_id}}/responses response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {string} queryNetworkId
 * @return {Promise}
 */
async function apiQueryNetworkResponses(nodeRpcUrl, queryNetworkId) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'GET',
                uri: `${nodeRpcUrl}/api/query/${queryNetworkId}/responses`,
                json: true,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}


/**
 * @typedef {Object} ReadNetwork
 * @property {string} message A human readable message of outcome.
 */

/**
 * Fetch api/read/network
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param queryId ID of the network query.
 * @param replyId ID of the reply of the network query.
 * @param dataSetId ID of the data-set that's purchasing.
 * @return {Promise.<ReadNetwork>}
 */
async function apiReadNetwork(nodeRpcUrl, queryId, replyId, dataSetId) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'POST',
                uri: `${nodeRpcUrl}/api/read/network`,
                json: true,
                body: {
                    query_id: queryId,
                    reply_id: replyId,
                    data_set_id: dataSetId,
                },
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.statusCode !== 200) {
                    reject(Error(`/api/read/network failed. Body: ${body.toString()}`));
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} WithdrawResponse
 * @property {string} message informing that withdraw process was initiated.
 */

/**
 * Fetch /api/withdraw response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {number} tokenCount
 * @return {Promise.<WithdrawResponse>}
 */
async function apiWithdraw(nodeRpcUrl, tokenCount) {
    return new Promise((accept, reject) => {
        const jsonQuery = {
            trac_amount: tokenCount,
        };
        request(
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/withdraw`,
                json: true,
                body: jsonQuery,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} DepositResponse
 * @property {string} message informing that deposit process went fine.
 */

/**
 * Fetch /api/deposit response
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {number} tokenCount
 * @return {Promise.<DepositResponse>}
 */
async function apiDeposit(nodeRpcUrl, tokenCount) {
    return new Promise((accept, reject) => {
        const jsonQuery = {
            trac_amount: tokenCount,
        };
        request(
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/deposit`,
                json: true,
                body: jsonQuery,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

/**
 * @typedef {Object} ConsensusResponse
 * @property {Object} events an array of events with side1 and/or side2 objects.
 */

/**
 * Fetch /api/apiConsensus/{{sender_id}}
 *
 * @param {string} nodeRpcUrl URL in following format http://host:port
 * @param {string} senderId ID of the sender, i.e. "urn:ot:object:actor:id:Company_Green"
 * @return {Promise.<ConsensusResponse>}
 */
async function apiConsensus(nodeRpcUrl, senderId) {
    return new Promise((accept, reject) => {
        request(
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                uri: `${nodeRpcUrl}/api/consensus/${senderId}`,
                json: true,
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                accept(body);
            },
        );
    });
}

module.exports = {
    apiImport,
    apiImportInfo,
    apiImportsInfo,
    apiFingerprint,
    apiQueryLocal,
    apiQueryLocalImportByDataSetId,
    apiReplication,
    apiQueryNetwork,
    apiQueryNetworkResponses,
    apiReadNetwork,
    apiWithdraw,
    apiDeposit,
    apiConsensus,
};
