import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    rules: {
      "no-undef": ["error"],
    },
  },
  pluginJs.configs.recommended,
];
