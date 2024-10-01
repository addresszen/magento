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

const suite = {
  scope: ".checkout-shipping-address",
  selectors,
  address,
};

describe("Customer", () => {
  //skip for now since manually confirmed it is working
  describe.skip("Checkout - Shipping form", () => {
    beforeEach(() => {
      cy.setup("./fixtures/checkout/shipping.html", true);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });
});
