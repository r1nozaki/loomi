export default {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
};
