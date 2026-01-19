/**
 * Copyright (c) Address Zen
 *
 * Address Zen Frontend Initialization Component
 *
 * @package Addresszen_Lookup
 */
define([
    'jquery',
    'Addresszen_Lookup/binding.min'
], function ($) {
    'use strict';

    return function (config) {
        if (config.enabled === false) {
            return;
        }

        window.idpcConfig = {
            apiKey: config.api_key,
            autocomplete: config.addressAutocomplete,
            removeOrganisation: config.removeOrganisation,
            hoistCountryField: config.hoistCountryField,
            requireCounty: config.requireCounty,
            autocompleteOverride: config.autocompleteOverride,
            customFields: config.customFields,
            checkoutOnly: config.checkoutOnly,
            matchCheckout: config.matchCheckout
        };

        if (typeof window.zenStart === 'function') {
            window.zenStart();
        }
    };
});
