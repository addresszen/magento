/// <reference types="cypress" />

import { autocompleteSuite } from "../support/suite";
import { selectors } from "../../../../lib/multishipping";

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

describe("Multishipping", () => {
  describe("Create New Customer Account", () => {
    const suite = {
      scope: ".form.create.account.form-create-account",
      selectors,
      address,
    };
    beforeEach(() => {
      cy.setup("./fixtures/multishipping/checkout-register.html", true);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });

  describe("Create Shipping Address", () => {
    const suite = {
      scope: ".form-address-edit",
      selectors,
      address,
    };

    beforeEach(() => {
      cy.setup(
        "./fixtures/multishipping/checkoutaddress-newshipping.html",
        true
      );
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });
});
