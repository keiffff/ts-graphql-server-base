/** @type {import('jest').Config} */
const config = {
  resolver: 'ts-jest-resolver',
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      { useESM: true }
    ],
  },
};

module.exports = config;