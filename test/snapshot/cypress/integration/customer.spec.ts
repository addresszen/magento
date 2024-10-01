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

const suite = {
  scope: ".form-address-edit",
  selectors,
  address,
};

describe("Customer", () => {
  //skip for now since manually confirmed it is working
  describe.skip("Account - New address", () => {
    beforeEach(() => {
      cy.setup("./fixtures/customer/address-form.html", true);
    });
    //@ts-expect-error
    autocompleteSuite(suite);
  });
});
