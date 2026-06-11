var config = {
    map: {
        '*': {
            'addressZenAdminBinding': 'Addresszen_Lookup/admin.min'
        }
    },
    shim: {
        'Addresszen_Lookup/admin.min': {
            exports: 'AddressZen'
        }
    }
};
