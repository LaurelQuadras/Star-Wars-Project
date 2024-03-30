const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "app/**/*.ts",
    "app/**/*.tsx",
    "!app/lib/**/*.ts",
    "!app/not-found.tsx",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov", "text", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  rootDir: "./",
  moduleDirectories: ["node_modules", "<rootDir>/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
