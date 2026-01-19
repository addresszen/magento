var config = {
    map: {
        '*': {
            'addressZenAdminInit': 'Addresszen_Lookup/js/address-zen-admin-init',
            'addressZenAdminBinding': 'Addresszen_Lookup/admin.min'
        }
    },
    shim: {
        'Addresszen_Lookup/admin.min': {
            deps: ['jquery']
        }
    }
};
