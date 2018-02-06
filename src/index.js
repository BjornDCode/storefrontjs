import Client from 'shopify-buy';

import productsModule from './modules/products';

let Storefront = {};

Storefront.install = function(Vue, options) {

    Vue.prototype.$client = Client.buildClient({
        domain: options.domain,
        storefrontAccessToken: options.storeFrontAccessToken
    });

    options.store.registerModule('shop', {
        state: {}
    });

    options.store.registerModule(['shop', 'products'], productsModule);

}



export default Storefront;
