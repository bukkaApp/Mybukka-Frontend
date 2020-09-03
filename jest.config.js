module.exports = {
  verbose: false,
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|less|scss)$': '<rootDir>/assetsTransformer.js',
    'Components(.*)$': '<rootDir>/src/components/$1',
    'Features(.*)$': '<rootDir>/src/features/$1',
    'Icons(.*)$': '<rootDir>/src/components/icons/$1',
    'Redux(.*)$': '<rootDir>/src/redux/$1',
    'Utilities(.*)$': '<rootDir>/src/utils/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
  ],
  testMatch: ['<rootDir>/src/**/**/tests/*.js'],
  testPathIgnorePatterns: [
    '<rootDir>/src/index.js',
    '<rootDir>/src/components/root/'
  ],
  collectCoverageFrom: [
    '!<rootDir>/src/index.js',
    '!<rootDir>/src/root',
    '!<rootDir>/src/redux',
    '!<rootDir>/src/utils',
    'src/**/*.{js,jsx}'
  ],
  globals: {
    Materialize: true
  }
};
