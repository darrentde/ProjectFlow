module.exports = {
  extends: [
    "next/core-web-vitals",
    // "airbnb", removed so that it works with react testing import
    // "airbnb/hooks",
    "prettier",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:testing-library/react",
  ],
  plugins: ["react", "@typescript-eslint", "prettier"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "typescript-eslint/explicit-module-boundary-types": "off", // setup testing tutoriak 18:58
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "consistent-return": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-filename-extension": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "prettier/prettier": "warn",
  },
};
