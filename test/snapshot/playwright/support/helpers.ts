import { Page } from "@playwright/test";

interface SetupOptions {
  url: string;
  store: boolean;
  customFields?: any[];
}

const adminSources = ["admin.js", "start.js"];
const storeSources = ["jquery.js", "store.js", "start.js"];

export async function setup(page: Page, options: SetupOptions) {
  const { url, store, customFields } = options;

  await page.addInitScript((cfg) => {
    (window as any).idpcConfig = {
      apiKey: cfg.apiKey,
      populateCounty: true,
      autocomplete: true,
      autocompleteOverride: {
        checkKey: false,
        defaultCountry: "USA",
        detectCountry: false,
      },
      customFields: cfg.customFields || [],
    };
  }, { apiKey: "ak_go", customFields: customFields || [] });

  await page.goto(url);

  const sources = store ? storeSources : adminSources;
  for (const src of sources) {
    await page.addScriptTag({
      url: `http://localhost:60154/${src}`,
    });
  }

  await page.waitForTimeout(2000);
}

export const usAddress = {
  line_1: "1 Apple Park Way",
  line_2: "",
  line_3: "",
  city: "Cupertino",
  zip_plus_4_code: "95014-0642",
  state_abbreviation: "CA",
  organisation_name: "",
  country: "US",
};

interface Suite {
  scope: string;
  selectors: Record<string, string>;
  address: typeof usAddress;
}

export async function runAutocompleteSuite(page: Page, suite: Suite) {
  const { scope, selectors, address } = suite;
  const container = page.locator(scope);

  await container.locator(selectors.country).selectOption("US", { force: true });
  await page.waitForTimeout(2000);

  await container.locator(selectors.line_1).fill("");
  await container.locator(selectors.line_1).type(address.line_1, { delay: 50 });
  await page.waitForTimeout(3000);

  const suggestion = page.locator(".idpc_ul li").first();
  if (await suggestion.isVisible()) {
    await suggestion.click();
  }
}
