declare global {
  interface Window {
    AddressLookup: any;
    zenStart: any;
  }
}

import {
  Config as BaseConfig,
  OutputFields
} from "@ideal-postcodes/jsutil";

import { AddressFinder } from "@ideal-postcodes/address-finder";

AddressFinder.defaults.baseUrl = "api.addresszen.com";
AddressFinder.defaults.defaultCountry = "USA";
AddressFinder.defaults.format = "usa";
AddressFinder.defaults.titleizePostTown = false;

const AddressLookup = {
  ...AddressFinder
}

export interface Config extends BaseConfig {
  removeOrganisation: boolean;
  customFields?: OutputFields[];
}

export const setupAutocomplete = async (
  config: Config,
  outputFields: OutputFields,
  options: any = {},
) => {
  if (!config.autocomplete) return;
  if (outputFields.line_1 === undefined) return;
  await AddressLookup.watch(
    {
      apiKey: config.apiKey,
      checkKey: true,
      removeOrganisation: config.removeOrganisation,
      populateCounty: config.populateCounty,
      defaultCountry: "USA",
      outputFields,
      ...config.autocompleteOverride,
    },
    options
  );
};

export const includes = (haystack: string, needle: string): boolean =>
  haystack.indexOf(needle) !== -1;
