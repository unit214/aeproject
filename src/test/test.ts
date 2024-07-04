import { exec } from "promisify-child-process";
import { print } from "../utils/utils";

export const run = async (path) => {
  const workingDirectory = path || process.cwd();

  await test(workingDirectory);
};

async function test(cwd) {
  print("===== Starting Tests =====");

  const child = exec("npm test", { cwd });

  child.stdout.on("data", (out) => process.stdout.write(out));
  child.stderr.on("data", (err) => process.stderr.write(err));
  await child;
}
