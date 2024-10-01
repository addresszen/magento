import {
  Config,
  includes,
  setupAutocomplete
} from "./extension";

export const selectors = {
  line_1: "#street_1",
  line_2: "#street_2",
  line_3: "#street_3",
  organisation_name: "#company",
  city: "#city",
  state_abbreviation: "#region_id",
  country: "#country",
  zip_plus_4_code: '[name="postcode"]',
};

const pageTest = () => includes(window.location.pathname, "/multishipping");

export const bind = (config: Config) => {
  setupAutocomplete(config, selectors, { pageTest });
};
