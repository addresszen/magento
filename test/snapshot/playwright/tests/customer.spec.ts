import { test, expect } from "@playwright/test";
import { setup, usAddress, runAutocompleteSuite } from "../support/helpers";

const selectors = {
  line_1: "#street_1",
  line_2: "#street_2",
  line_3: "#street_3",
  organisation_name: "#company",
  city: "#city",
  state_abbreviation: "#region_id",
  country: "#country",
  zip_plus_4_code: '[name="postcode"]',
};

const suite = {
  scope: ".form-address-edit",
  selectors,
  address: usAddress,
};

test.describe("Customer - Account New address", () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, {
      url: "/customer/address-form.html",
      store: true,
    });
  });

  test("Autocomplete", async ({ page }) => {
    await runAutocompleteSuite(page, suite);
  });
});
