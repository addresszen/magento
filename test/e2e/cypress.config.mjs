import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
    video: false,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  env: {
    MAGENTO_VERSION: '2.4'
  }
});
