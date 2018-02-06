import Client from 'shopify-buy';

let Storefront = {};

Storefront.install = function(Vue, options) {

    Vue.prototype.$client = Client.buildClient({
        domain: options.domain,
        storefrontAccessToken: options.storeFrontAccessToken
    });

    console.log('this is now watching')

}



export default Storefront;
