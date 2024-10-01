import { selectors } from "./billing";
import {
  Config,
  setupAutocomplete,
  includes
} from "./extension";

const pageTest = () => includes(window.location.pathname, "/checkout");

export const bind = (config: Config) => {
  setupAutocomplete(config, selectors, { pageTest });
};
