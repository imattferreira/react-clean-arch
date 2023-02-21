module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts|tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "js-dom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ".+\\.(ts|tsx)$": ["ts-jest", { isolatedModules: true }],
  },
};
