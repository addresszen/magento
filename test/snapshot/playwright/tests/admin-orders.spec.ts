import { test, expect } from "@playwright/test";
import { setup, usAddress, runAutocompleteSuite } from "../support/helpers";

const billing = {
  line_1: '[name="order[billing_address][street][0]"]',
  line_2: '[name="order[billing_address][street][1]"]',
  line_3: '[name="order[billing_address][street][2]"]',
  zip_plus_4_code: '[name="order[billing_address][postcode]"]',
  city: '[name="order[billing_address][city]"]',
  organisation_name: '[name="order[billing_address][company]"]',
  state_abbreviation: '[name="order[billing_address][region_id]"]',
  country: '[name="order[billing_address][country_id]"]',
};

const shipping = {
  line_1: '[name="order[shipping_address][street][0]"]',
  line_2: '[name="order[shipping_address][street][1]"]',
  line_3: '[name="order[shipping_address][street][2]"]',
  zip_plus_4_code: '[name="order[shipping_address][postcode]"]',
  city: '[name="order[shipping_address][city]"]',
  organisation_name: '[name="order[shipping_address][company]"]',
  state_abbreviation: '[name="order[shipping_address][region_id]"]',
  country: '[name="order[shipping_address][country_id]"]',
};

test.describe("Admin", () => {
  test.describe("New Order - Billing", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/admin/sales/customer-2.html",
        store: false,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: "#order-billing_address",
        selectors: billing,
        address: usAddress,
      });
    });
  });

  test.describe("New Order - Shipping", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/admin/sales/customer-2.html",
        store: false,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: "#order-shipping_address",
        selectors: shipping,
        address: usAddress,
      });
    });
  });

  test.describe("New Order (shipping same as billing)", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/admin/sales/new-customer.html",
        store: false,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: "#order-billing_address",
        selectors: billing,
        address: usAddress,
      });
    });
  });
});
