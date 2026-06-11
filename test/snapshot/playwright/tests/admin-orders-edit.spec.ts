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

test.describe("Admin", () => {
  test.describe("Orders Edit", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/admin/sales/order/edit.html",
        store: false,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: "#edit_form",
        selectors,
        address: usAddress,
      });
    });
  });

  test.describe("Customer Edit", () => {
    test.beforeEach(async ({ page }) => {
      await setup(page, {
        url: "/admin/customer/edit.html",
        store: false,
      });
    });

    test("Autocomplete", async ({ page }) => {
      await runAutocompleteSuite(page, {
        scope: ".customer_form_areas_address_address_customer_address_update_modal_update_customer_address_form_loader",
        selectors,
        address: usAddress,
      });
    });
  });
});
