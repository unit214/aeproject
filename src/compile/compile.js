const { print } = require('../utils/utils');

const deprecatedMessage = 'Compiling contracts from aeproject has been removed, please use aecli, npm i -g @aeternity/aepp-cli';

async function run() {
  print(deprecatedMessage);
}

module.exports = {
  run,
  deprecatedMessage,
};
