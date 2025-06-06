
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globalSetup: './jest-env.ts',
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
    setupFilesAfterEnv: ["./src/jest.setup"],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
};
