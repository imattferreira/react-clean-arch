module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts|tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "js-dom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
  },
  transform: {
    ".+\\.(ts|tsx)$": ["ts-jest", { isolatedModules: true }],
  },
};
