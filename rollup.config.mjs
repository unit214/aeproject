import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import esmShim from "@rollup/plugin-esm-shim";

export default [
  {
    input: "src/cli.ts",
    output: [
      {
        file: "dist/cli.umd.js",
        format: "umd",
        name: "aeproject cli",
        sourcemap: true,
      },
      {
        file: "dist/cli.esm.mjs",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/cli.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [esmShim(), typescript(), json()],
  },
  {
    input: "src/lib/index.ts",
    output: [
      {
        file: "dist/lib.index.umd.js",
        format: "umd",
        name: "aeproject library",
        sourcemap: true,
      },
      {
        file: "dist/lib.index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/lib.index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [esmShim(), typescript(), json()],
  },
];
