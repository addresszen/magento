import { selectors } from "./multishipping";
import {
  Config,
  includes,
  setupAutocomplete,
} from "./extension";

const pageTest = () => includes(window.location.pathname, "/customer/address");

export const bind = (config: Config) => {
  setupAutocomplete(config, selectors, { pageTest });
};
