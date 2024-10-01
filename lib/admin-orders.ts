import { getParent } from "@ideal-postcodes/jsutil";
import { Config, setupAutocomplete, includes } from "./extension";

export const billing = {
  line_1: '[name="order[billing_address][street][0]"]',
  line_2: '[name="order[billing_address][street][1]"]',
  line_3: '[name="order[billing_address][street][2]"]',
  zip_plus_4_code: '[name="order[billing_address][postcode]"]',
  city: '[name="order[billing_address][city]"]',
  organisation_name: '[name="order[billing_address][company]"]',
  state_abbreviation: '[name="order[billing_address][region_id]"]',
  country: '[name="order[billing_address][country_id]"]',
};

export const shipping = {
  line_1: '[name="order[shipping_address][street][0]"]',
  line_2: '[name="order[shipping_address][street][1]"]',
  line_3: '[name="order[shipping_address][street][2]"]',
  zip_plus_4_code: '[name="order[shipping_address][postcode]"]',
  city: '[name="order[shipping_address][city]"]',
  organisation_name: '[name="order[shipping_address][company]"]',
  state_abbreviation: '[name="order[shipping_address][region_id]"]',
  country: '[name="order[shipping_address][country_id]"]',
};

const selectorList = [billing, shipping];

const parentScope = "fieldset";

export const bind = (config: Config) => {
  selectorList.forEach((selectors) => {
    setupAutocomplete(config, selectors, {
      pageTest,
      getScope: (anchor: HTMLElement) => getParent(anchor, parentScope),
    });
  });
};

const pageTest = () => includes(window.location.pathname, "/sales");
