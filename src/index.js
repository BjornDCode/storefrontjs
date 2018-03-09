import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';
import gql from 'graphql-tag';

import components from './components';

import BaseProductsView from './views/BaseProductsView';
import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import CollectionView from './views/CollectionView';
import CartView from './views/CartView';
import TagView from './views/TagView';
import VendorView from './views/VendorView';
import ProductTypeView from './views/ProductTypeView';

let Storefront = {

    install(Vue, options) {

        if (!options) {
            throw new Error('You must provide an options object when initialising Storefront');
        }

        if (!options.domain) {
            throw new Error('You must provide an url to a Shopify store');
        }

        if (!options.storefrontAccessToken) {
            throw new Error('You must provide an access token to your Shopify store. \n See more information: https://help.shopify.com/api/storefront-api/getting-started#authentication');
        }

        if (!options.cache) {
            throw new Error("You must provide a cache create with 'apollo-cache-inmemory'");
        }

        if (!options.persistor) {
            throw new Error("You must provide a persistor created with 'persistCache' from 'apollo-cache-persist'")
        }

        // Setup a global event bus
        Vue.prototype.$event = new Vue();

        // Wait until data from the cache is retrieved to initialise the rest of Apollo
        options.persistor.then(() => {
            const httpLink = new HttpLink({
                uri: `${options.domain}/api/graphql`,
                headers: {
                    'X-Shopify-Storefront-Access-Token': options.storefrontAccessToken
                }
            });

            const apolloClient = new ApolloClient({
                link: httpLink,
                cache: options.cache,
                connectToDevTools: options.apolloDevTools
            });

            Vue.use(VueApollo)

            const apolloProvider = new VueApollo({
                defaultClient: apolloClient
            });

            Vue.provider = function() {
                return apolloProvider.provide();
            }

        }); // End of promise

        // Register all Storefront components
        this.setupComponents(Vue);

        // Initialise Routes if a router is provided
        if (options.router) {
            this.setupRoutes(options.router);
        }

    },

    setupComponents(Vue) {
        Vue.component('sf-base-products-view', components.BaseProductsView);

        Vue.component('sf-product-card', components.ProductCard);
        Vue.component('sf-product-list', components.ProductList);

        Vue.component('sf-product', components.Product);
        Vue.component('sf-product-description', components.ProductDescription);
        Vue.component('sf-product-actions', components.ProductActions);
        Vue.component('sf-product-price', components.ProductPrice);
        Vue.component('sf-product-tags', components.ProductTags);

        Vue.component('sf-product-options', components.ProductOptions);
        Vue.component('sf-product-options-radio', components.ProductOptionsRadio);
        Vue.component('sf-product-options-select', components.ProductOptionsSelect);

        Vue.component('sf-product-tabs', components.ProductTabs);
        Vue.component('sf-product-tab', components.ProductTab);

        Vue.component('sf-product-images', components.ProductImages);
        Vue.component('sf-product-images-gallery', components.ProductImagesGallery);
        Vue.component('sf-product-images-slider', components.ProductImagesSlider);

        Vue.component('sf-cart', components.Cart);
        Vue.component('sf-cart-link', components.CartLink);

        Vue.component('sf-price', components.Price);
        Vue.component('sf-error', components.StorefrontError);
        Vue.component('sf-loader', components.Loader);
        Vue.component('sf-pagination', components.Pagination);
        Vue.component('sf-pagination-collection', components.PaginationCollection);
    },

    setupRoutes(router) {
        const routes = [
            { path: '/products', component: ProductsView },
            { path: '/product/:handle', component: ProductView },
            { path: '/collection/:handle', component: CollectionView },
            { path: '/tag/:handle', component: TagView },
            { path: '/vendor/:handle', component: VendorView },
            { path: '/type/:handle', component: ProductTypeView },
            { path: '/cart', component: CartView }
        ];

        router.addRoutes(routes);
    }

};


export default Storefront;
