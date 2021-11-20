const compile = require('../compile/compile');
const init = require('../init/init');
const testConfig = require('../test/test');
const env = require('../env/env');
const deploy = require('../deploy/deploy');
const config = require('../config/node-config.json');

const dockerIp = config.nodeConfiguration.dockerMachineIP;
const compatibility = require('../compatibility/compatibility');

const nodeConfig = config.nodeConfiguration;
const compilerConfig = config.compilerConfiguration;

const addInitOption = (program) => {
  program
    .command('init')
    .description('Initialize AEproject')
    .option('--update [update]', 'Update project files')
    .action(async (option) => {
      await init.run(option.update);
    });
};

const addCompileOption = (program) => {
  program
    .command('compile')
    .description(compile.deprecatedMessage)
    .action(async (option) => {
      await compile.run(option.path, option.compiler);
    });
};

const addTestOption = (program) => {
  program
    .command('test')
    .description('Running the tests')
    .action(async (options) => {
      await testConfig.run(options.path);
    });
};

const addEnvOption = (program) => {
  program
    .command('env')
    .description('Running a local network. Without any argument started with default configuration')
    .option('--stop', 'Stop the node')
    .option('--info', 'Displays information about your current node status if any, and absolute path where it has been started from')
    .option('--nodeVersion [nodeVersion]', `Specify node version, default is ${nodeConfig.imageVersion}`, nodeConfig.imageVersion)
    .option('--compilerVersion [compilerVersion]', `Specify compiler version, default is ${compilerConfig.imageVersion}`, compilerConfig.imageVersion)
    .action(async (options) => {
      await env.run(options);
    });
};

const addDeployOption = (program) => {
  program
    .command('deploy')
    .description('Run deploy script')
    .option('--path [deploy path]', 'Path to deployment file', './deployment/deploy.js')
    .option('-s --secretKey [secretKey]', 'SecretKey (privateKey) to use for deployment')
    .option('-n --network [network]', 'Select a network defined in config/network.json', 'local')
    .option('-c --compiler [compiler_url]', 'URL of the http compiler to use')
    .action(async (options) => {
      await deploy.run(options.path, options.secretKey, options.network, options.compiler);
    });
};

const addCompatibility = (program) => {
  program
    .command('compatibility')
    .description('Start env with latest versions and test the current project for compatibility')
    .option('--nodeVersion [nodeVersion]', 'Specify node version')
    .option('--compilerVersion [compilerVersion]', 'Specify compiler version')
    .option('--windows', 'Start the node in windows env')
    .option('--docker-ip [default docker machine ip]', `Set docker machine IP, default is "${dockerIp}"`, dockerIp)
    .action(async (options) => {
      await compatibility.run(options);
    });
};

const initCommands = (program) => {
  addInitOption(program);
  addCompileOption(program);
  addTestOption(program);
  addEnvOption(program);
  addDeployOption(program);
  addCompatibility(program);
};

module.exports = {
  initCommands,
};
