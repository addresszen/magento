import { test, expect } from "@playwright/test";
import { setup, usAddress, runAutocompleteSuite } from "../support/helpers";

const selectors = {
  line_1: '[name="street[0]"]',
  line_2: '[name="street[1]"]',
  line_3: '[name="street[2]"]',
  zip_plus_4_code: '[name="postcode"]',
  city: '[name="city"]',
  organisation_name: '[name="company"]',
  state_abbreviation: '[name="region_id"]',
  country: '[name="country_id"]',
};

const suite = {
  scope: ".checkout-billing-address",
  selectors,
  address: usAddress,
};

test.describe("Checkout - Billing form", () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, {
      url: "/checkout/billing.html",
      store: true,
    });
  });

  test("Autocomplete", async ({ page }) => {
    await runAutocompleteSuite(page, suite);
  });
});
