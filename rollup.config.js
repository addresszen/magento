import commonjs from "@rollup/plugin-commonjs";
//import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "@wessberg/rollup-plugin-ts";
import json from '@rollup/plugin-json';

const banner = `/**
 * @license
 * AddressZen <https://addresszen.com>
 * Magento Integration
 * Copyright IDDQD Limited, all rights reserved
 */`;

// Configure terser to ignore build info banner
const terserConfig = {
  output: {
    comments: (_, { value, type }) => {
      if (type === "comment2") return /@license/i.test(value);
    },
  },
};

const targets = "last 2 versions";

const config = (file) => {
  return {
    output: {
      file,
      banner,
      format: "iife",
      name: "AddressZen",
      exports: "named",
    },
    plugins: [
      json(),
      nodeResolve({ extensions: [".js", ".ts"], browser: true }),
      commonjs(),
      ts({
        transpiler: "babel",
        browserslist: [targets],
        babelConfig: {
          presets: [["@babel/preset-env", { targets }]],
        },
      }),
      //terser(terserConfig)
    ],
  };
};

export default [
  {
    ...config("./view/base/web/binding.min.js"),
    input: "./lib/store.ts",
  },
  {
    ...config("./view/base/web/admin.min.js"),
    input: "./lib/admin.ts",
  },
];
