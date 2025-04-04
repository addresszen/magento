/// <reference types="cypress" />

import { autocompleteSuite } from "../support/suite";
import { selectors } from "../../../../lib/admin-orders-edit";

const address = {
  line_1: "1 Apple Park Way",
  line_2: "",
  line_3: "",
  city: "Cupertino",
  zip_plus_4_code: "95014-0642",
  state_abbreviation: "CA",
  organisation_name: "",
  country: "US",
}

describe("Admin", () => {
  describe("Orders Edit", () => {
    const suite = {
      scope: "#edit_form",
      selectors,
      address,
    };
    before(() => {
      cy.setup("./fixtures/admin/sales/order/edit.html", false);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });

  describe("Customer Edit", () => {
    before(() => {
      cy.setup("./fixtures/admin/customer/edit.html", false);
    });
    const suite = {
      scope:
        ".customer_form_areas_address_address_customer_address_update_modal_update_customer_address_form_loader",
      selectors,
      address,
    };
    //@ts-expect-error
    autocompleteSuite(suite);
  });

  describe("Custom Fields", () => {
    const suite = {
      scope: "#order-billing_address_fields",
      selectors: {
        line_1: "#order-billing_address_street0",
        line_2: "#order-billing_address_street1",
        line_3: "#order-billing_address_street2",
        country: "#order-billing_address_country_id",
        city: "#order-billing_address_city",
        zip_plus_4_code: "#order-billing_address_postcode",
      },
      address,
    };
    before(() => {
      // @ts-ignore
      cy.setup("./fixtures/customer/custom-address-fields.html", false, [
        suite.selectors,
      ]);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });
});
