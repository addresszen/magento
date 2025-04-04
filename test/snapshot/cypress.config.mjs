import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    port: 60154,
    video: false,
    defaultCommandTimeout: 10000,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
