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

test.describe("Multishipping", () => {
  test.describe("Create New Customer Account", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/multishipping/checkout-register.html",
        store: true,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: ".form.create.account.form-create-account",
        selectors,
        address: usAddress,
      });
    });
  });

  test.describe("Create Shipping Address", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/multishipping/checkoutaddress-newshipping.html",
        store: true,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: ".form-address-edit",
        selectors,
        address: usAddress,
      });
    });
  });
});
