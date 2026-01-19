/**
 * Copyright (c) Address Zen
 *
 * Address Zen Admin Initialization Component
 *
 * @package Addresszen_Lookup
 */
define([
    'jquery',
    'Addresszen_Lookup/admin.min'
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
            customFields: config.customFields
        };

        if (typeof window.zenStart === 'function') {
            window.zenStart();
        }
    };
});
