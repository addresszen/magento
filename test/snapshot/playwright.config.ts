import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: path.join(__dirname, "playwright/tests"),
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: "http://localhost:60154",
    headless: true,
  },
  webServer: {
    command: `npx http-server ${path.join(__dirname, "fixtures")} -p 60154 --cors -c-1`,
    port: 60154,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
