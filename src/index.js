import Client from 'shopify-buy';

import productsModule from './modules/products';
import collectionsModule from './modules/collections';
import cartModule from './modules/cart';

import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';
import TagPage from './pages/TagPage';
import VendorPage from './pages/VendorPage';
import ProductTypePage from './pages/ProductTypePage';

import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';

import Product from './components/Product';
import ProductDescription from './components/ProductDescription';
import ProductActions from './components/ProductActions';
import ProductPrice from './components/ProductPrice';
import ProductTags from './components/ProductTags';

import ProductOptions from './components/ProductOptions';
import ProductOptionsRadio from './components/ProductOptionsRadio';
import ProductOptionsSelect from './components/ProductOptionsSelect';

import ProductTabs from './components/ProductTabs';
import ProductTab from './components/ProductTab';

import ProductImages from './components/ProductImages';
import ProductImagesGallery from './components/ProductImagesGallery';
import ProductImagesSlider from './components/ProductImagesSlider';

import Cart from './components/Cart';
import CartLink from './components/CartLink';

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
        Vue.component('sf-product-price', ProductPrice);
        Vue.component('sf-product-tags', ProductTags);

        Vue.component('sf-product-options', ProductOptions);
        Vue.component('sf-product-options-radio', ProductOptionsRadio);
        Vue.component('sf-product-options-select', ProductOptionsSelect);

        Vue.component('sf-product-tabs', ProductTabs);
        Vue.component('sf-product-tab', ProductTab);

        Vue.component('sf-product-images', ProductImages);
        Vue.component('sf-product-images-gallery', ProductImagesGallery);
        Vue.component('sf-product-images-slider', ProductImagesSlider);

        Vue.component('sf-cart', Cart);
        Vue.component('sf-cart-link', CartLink);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsPage },
                { path: '/product/:handle', component: ProductPage },
                { path: '/collection/:handle', component: CollectionPage },
                { path: '/tag/:handle', component: TagPage },
                { path: '/vendor/:handle', component: VendorPage },
                { path: '/type/:handle', component: ProductTypePage },
                { path: '/cart', component: CartPage }
            ];

            options.router.addRoutes(routes);
        }

        options.store.registerModule('shop', {
            state: {}
        });

        options.store.registerModule(['shop', 'products'], productsModule,);
        options.store.registerModule(['shop', 'collections'], collectionsModule);
        options.store.registerModule(['shop', 'cart'], cartModule);
 
    }

    

};


export default Storefront;
