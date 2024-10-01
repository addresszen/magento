import {
  Config,
  setupAutocomplete,
  includes
} from "./extension";
import { getParent } from "@ideal-postcodes/jsutil";

export const selectors = {
  line_1: '[name="street[0]"]',
  line_2: '[name="street[1]"]',
  line_3: '[name="street[2]"]',
  zip_plus_4_code: '[name="postcode"]',
  city: '[name="city"]',
  organisation_name: '[name="company"]',
  state_abbreviation: '[name="region_id"]',
  country: '[name="country_id"]',
};

export const pageTest = () => includes(window.location.pathname, "/checkout");
export const getScope = (anchor: HTMLElement) => getParent(anchor, "form")

export const bind = (config: Config) => {
  setupAutocomplete(config, selectors, { pageTest, getScope });
};
