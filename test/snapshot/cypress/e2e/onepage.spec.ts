/// <reference types="cypress" />

import { autocompleteSuite } from "../support/suite";
import { selectors } from "../../../../lib/billing";

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

const suiteShipping = {
  scope: ".checkout-shipping-address",
  selectors,
  address,
};

const suiteBilling = {
  scope: ".checkout-billing-address",
  selectors,
  address,
};

const suiteShippingCom = {
  scope: ".form-shipping-address",
  selectors,
  address,
};

describe("One Page Checkout", () => {
  describe("Demo checkout", () => {
    beforeEach(() => {
      cy.setup("./fixtures/checkout/onepagecheckout-demo.html", true);
    });
    describe("Shipping", () => {
      //@ts-expect-error
      autocompleteSuite(suiteShipping);
    });
    describe("Billing", () => {
      //@ts-expect-error
      autocompleteSuite(suiteBilling);
    });
  });
  //skipping for now
  describe.skip("Express Checkout Lane", () => {
    beforeEach(() => {
      cy.setup("./fixtures/checkout/onestepcheckoutcom-checkout.html", true);
    });
    //@ts-expect-error
    autocompleteSuite(suiteShippingCom);
  });
});
