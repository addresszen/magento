/**
 * Address Zen - Admin Initialization
 *
 * This module receives configuration from x-magento-init and initializes
 * the Address Zen address search functionality for the admin panel.
 */
define(['addressZenAdminBinding'], function () {
    'use strict';

    return function (config) {
        if (!config.enabled || !config.apiKey) {
            return;
        }

        window.idpcConfig = {
            apiKey: config.apiKey,
            autocomplete: config.autocomplete,
            populateCounty: config.populateCounty,
            removeOrganisation: config.removeOrganisation,
            customFields: config.customFields
        };

        if (typeof window.zenStart === 'function') {
            window.zenStart();
        }
    };
});
