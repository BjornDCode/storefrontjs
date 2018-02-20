import Client from 'shopify-buy';

import productsModule from './modules/products/index.js';
import collectionsModule from './modules/collections/index.js';
import cartModule from './modules/cart/index.js';

import ProductsPage from './pages/ProductsPage.vue';
import ProductPage from './pages/ProductPage.vue';
import CollectionPage from './pages/CollectionPage.vue';
import CartPage from './pages/CartPage.vue';

import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';

import Product from './components/Product.vue';
import ProductDescription from './components/ProductDescription.vue';
import ProductActions from './components/ProductActions.vue';

import ProductOptions from './components/ProductOptions.vue';
import ProductOptionsRadio from './components/ProductOptionsRadio.vue';
import ProductOptionsSelect from './components/ProductOptionsSelect.vue';

import ProductTabs from './components/ProductTabs.vue';
import ProductTab from './components/ProductTab.vue';

import ProductImages from './components/ProductImages.vue';
import ProductImagesGallery from './components/ProductImagesGallery.vue';
import ProductImagesSlider from './components/ProductImagesSlider.vue';

import Cart from './components/Cart.vue';

let Storefront = {

    install(Vue, options) {

        Vue.prototype.$client = Client.buildClient({
            domain: options.domain,
            storefrontAccessToken: options.storefrontAccessToken
        });

        Vue.component('sf-product-card', ProductCard);
        Vue.component('sf-product-list', ProductList);

        Vue.component('sf-product', Product);
        Vue.component('sf-product-description', ProductDescription);
        Vue.component('sf-product-actions', ProductActions);

        Vue.component('sf-product-options', ProductOptions);
        Vue.component('sf-product-options-radio', ProductOptionsRadio);
        Vue.component('sf-product-options-select', ProductOptionsSelect);

        Vue.component('sf-product-tabs', ProductTabs);
        Vue.component('sf-product-tab', ProductTab);

        Vue.component('sf-product-images', ProductImages);
        Vue.component('sf-product-images-gallery', ProductImagesGallery);
        Vue.component('sf-product-images-slider', ProductImagesSlider);

        Vue.component('sf-cart', Cart);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsPage },
                { path: '/product/:handle', component: ProductPage },
                { path: '/collection/:handle', component: CollectionPage },
                { path: '/cart', component: CartPage }
            ];

            options.router.addRoutes(routes);
        }

        options.store.registerModule('shop', {
            state: {}
        });

        options.store.registerModule(['shop', 'products'], productsModule);
        options.store.registerModule(['shop', 'collections'], collectionsModule);
        options.store.registerModule(['shop', 'cart'], cartModule);
 
    }

                           

};


export default Storefront;
