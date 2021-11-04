const constants = require('./constants.json');
const {execute, print} = require('../utils/utils');
const {copyFolderRecursiveSync, fileExists} = require('../utils/fs-utils');

async function run(update) {
  if (update) {
    await updateAEprojectProjectLibraries();
  } else {
    await createAEprojectProjectStructure();
  }
}

const createAEprojectProjectStructure = async () => {
  print('===== initializing aeproject =====');

  await setupArtifacts();
  await installDependencies();

  print('===== aeproject successfully initialized =====');
};

const updateAEprojectProjectLibraries = async () => {
  print('===== updating aeproject =====');

  await updateArtifacts();
  await installDependencies();

  print('===== aeproject sucessfully initalized =====');
};

const installDependencies = async (_sdkVersion = '') => {
  if (fileExists('./package.json')) {
    print('===== installing dependencies =====');
    await execute(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', 'install');
  }
};

const setupArtifacts = async () => {
  print('===== creating project file and directory structure =====');

  await copyFolderRecursiveSync(`${__dirname}${constants.updateArtifactsDir}`, constants.artifactsDest);
  await copyFolderRecursiveSync(`${__dirname}${constants.artifactsDir}`, constants.artifactsDest);
};

const updateArtifacts = async () => {
  print('===== creating project file and directory structure =====');

  let fileSource = `${__dirname}${constants.updateArtifactsDir}`;
  let destination = constants.artifactsDest;

  await copyFolderRecursiveSync(fileSource, destination);
};

module.exports = {
  run
};
