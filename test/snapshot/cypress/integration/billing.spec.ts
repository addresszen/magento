/// <reference types="cypress" />

import {
  autocompleteSuite,
} from "../support/suite";
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
  scope: ".checkout-billing-address",
  selectors,
  address,
};

describe("Customer", () => {
  describe("Checkout - Billing form", () => {
    beforeEach(() => {
      cy.setup("./fixtures/checkout/billing.html", true);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });
});
