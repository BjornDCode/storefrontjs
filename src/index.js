import Client from 'shopify-buy';

import productsModule from './modules/products/index.js';

import ProductsPage from './pages/ProductsPage.vue';
import CollectionPage from './pages/CollectionPage.vue';
import TagPage from './pages/TagPage.vue';

import ProductCard from './components/ProductCard.vue';
import ProductCardImage from './components/ProductCardImage.vue';
import ProductCardPrice from './components/ProductCardPrice.vue';
import ProductCardTitle from './components/ProductCardTitle.vue';
import ProductCardDescription from './components/ProductCardDescription.vue';

import ProductList from './components/ProductList.vue';

let Storefront = {

    install(Vue, options) {

        Vue.prototype.$client = Client.buildClient({
            domain: options.domain,
            storefrontAccessToken: options.storefrontAccessToken
        });

        Vue.component('sf-product-card', ProductCard);
        Vue.component('sf-product-card-image', ProductCardImage);
        Vue.component('sf-product-card-price', ProductCardPrice);
        Vue.component('sf-product-card-title', ProductCardTitle);
        Vue.component('sf-product-card-description', ProductCardDescription);

        Vue.component('sf-product-list', ProductList);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsPage },
                { path: '/collection/:handle', component: CollectionPage },
                { path: '/tag/:handle', component: TagPage }
            ];

            options.router.addRoutes(routes);
        }

        options.store.registerModule('shop', {
            state: {}
        });

        options.store.registerModule(['shop', 'products'], productsModule);

    }

};


export default Storefront;
