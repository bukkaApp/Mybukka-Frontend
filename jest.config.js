module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/client/*.js', '<rootDir>/client/**/*.js', '!<rootDir>/node_modules/'],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/client/setups/setup.js'],
    setupTestFrameworkScriptFile: '<rootDir>/client/setups/jest.config.js',
  };
  