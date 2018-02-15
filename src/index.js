import Client from 'shopify-buy';

import productsModule from './modules/products/index.js';
import collectionsModule from './modules/collections/index.js';

import ProductsPage from './pages/ProductsPage.vue';
import ProductPage from './pages/ProductPage.vue';
import CollectionPage from './pages/CollectionPage.vue';

import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';
import Product from './components/Product.vue';

let Storefront = {

    install(Vue, options) {

        Vue.prototype.$client = Client.buildClient({
            domain: options.domain,
            storefrontAccessToken: options.storefrontAccessToken
        });

        Vue.component('sf-product-card', ProductCard);
        Vue.component('sf-product-list', ProductList);
        Vue.component('sf-product', Product);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsPage },
                { path: '/product/:handle', component: ProductPage },
                { path: '/collection/:handle', component: CollectionPage }
            ];

            options.router.addRoutes(routes);
        }

        options.store.registerModule('shop', {
            state: {}
        });

        options.store.registerModule(['shop', 'products'], productsModule);

        options.store.registerModule(['shop', 'collections'], collectionsModule);

                             
 
    }

};


export default Storefront;
