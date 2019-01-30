module.exports = {
  verbose: true,
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|less|scss)$': '<rootDir>/assetsTransformer.js',
    'Components(.*)$': '<rootDir>/src/components/$1',
    'Icons(.*)$': '<rootDir>/src/components/icons/$1',
  },
  setupTestFrameworkScriptFile: '<rootDir>/tests/setup.js',
  testMatch: ['<rootDir>/src/**/**/tests/*.js'],
  testPathIgnorePatterns: [
    '<rootDir>/src/index.js',
    '<rootDir>/src/public/js/bootstrap.bundle.js',
    '<rootDir>/src/components/root/'
  ],
  collectCoverageFrom: [
    '!<rootDir>/src/index.js',
    '!<rootDir>/src/root/App.js',
    '!<rootDir>/src/root/Main.js',
    'src/**/*.{js,jsx}'
  ],
  globals: {
    Materialize: true
  }
};
