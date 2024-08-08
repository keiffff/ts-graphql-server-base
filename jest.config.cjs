/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      { useESM: true }
    ],
  },
};

module.exports = config;