module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts|tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ".+\\.ts$": ["ts-jest", { isolatedModules: true }],
  },
};
