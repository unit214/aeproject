#! /usr/bin/env node

import { program } from "commander";

import { initCommands } from "./cli/commands.js";
import packageJson from "../package.json";

const setupVersion = () => {
  program.version(packageJson.version);
};

const setupDefaultHandler = () => {
  program.on("command:*", () => {
    program.help();
  });
};

const setupCommands = () => {
  initCommands(program);
};

const parseParams = () => {
  program.parse(process.argv);
};

const presentHelpIfNeeded = () => {
  if (!program.args.length) program.help();
};

const run = () => {
  setupVersion();
  setupDefaultHandler();
  setupCommands();
  parseParams();
  presentHelpIfNeeded();
};

run();
