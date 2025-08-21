/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    browser: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "tailwindcss", "react", "jest"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:jest/recommended",
  ],
  rules: {
    // "@typescript-eslint/consistent-type-imports": [
    //   "warn",
    //   {
    //     prefer: "type-imports",
    //     fixStyle: "inline-type-imports",
    //   },
    // ],
    // "@typescript-eslint/no-unused-vars": [
    //   "warn",
    //   {
    //     argsIgnorePattern: "^_",
    //   },
    // ],
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "./tailwind.config.ts",
    },
    next: {
      rootDir: "./",
    },
  },
};

module.exports = config;
