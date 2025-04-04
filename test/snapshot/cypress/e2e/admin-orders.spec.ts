/// <reference types="cypress" />

import { autocompleteSuite } from "../support/suite";
import { billing, shipping } from "../../../../lib/admin-orders";

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
  describe("New Order Customer Address", () => {
    describe("Billing", () => {
      before(() => {
        cy.setup("./fixtures/admin/sales/customer-2.html", false);
      });
      const suite = {
        scope: "#order-billing_address",
        selectors: billing,
        address,
      };
      //@ts-expect-error
      autocompleteSuite(suite);
    });

    describe("Shipping", () => {
      before(() => {
        cy.setup("./fixtures/admin/sales/customer-2.html", false);
      });
      const suite = {
        scope: "#order-shipping_address",
        selectors: shipping,
        address,
      };
      //@ts-expect-error
      autocompleteSuite(suite);
    });
  });

  describe("New Order Customer Address (shipping same as billing)", () => {
    const suite = {
      scope: "#order-billing_address",
      selectors: billing,
      address,
    };

    before(() => {
      cy.setup("./fixtures/admin/sales/new-customer.html", false);
    });
    //ts-expect-error
    autocompleteSuite(suite);
  });
});
