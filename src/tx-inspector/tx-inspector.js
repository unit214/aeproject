const { verifyTransaction, Node } = require('@aeternity/aepp-sdk');
const { print, getNetwork } = require('../utils/utils');

const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

async function run(option) {
  if (!option.tx) {
    throw Error('<tx> Raw transaction is required');
  }

  if (option.tx.trim().split('_')[0] !== 'tx' || !base64regex.test(option.tx.trim().slice(3))) {
    throw new Error('Invalid raw transaction');
  }

  const network = getNetwork(option.network ? option.network : 'local', option.networkId);

  const node = await Node({ url: network.url, ignoreVersion: true });
  const result = await verifyTransaction(option.tx, node);

  printValidationResult(result);
}

function printValidationResult(data) {
  print();
  if (data) {
    data.map((x) => {
      print(x.message);
    });
  }
}

module.exports = {
  run,
};
