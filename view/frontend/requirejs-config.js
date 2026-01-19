var config = {
    map: {
        '*': {
            'addressZenInit': 'Addresszen_Lookup/js/address-zen-init',
            'addressZenBinding': 'Addresszen_Lookup/binding.min'
        }
    },
    shim: {
        'Addresszen_Lookup/binding.min': {
            deps: ['jquery']
        }
    }
};
