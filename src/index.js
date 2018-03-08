import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';

import productsModule from './modules/products';
import collectionsModule from './modules/collections';
import cartModule from './modules/cart';

import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import CollectionView from './views/CollectionView';
import CartView from './views/CartView';
import TagView from './views/TagView';
import VendorView from './views/VendorView';
import ProductTypeView from './views/ProductTypeView';

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

import Price from './components/Price';
import Error from './components/Error';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import PaginationCollection from './components/PaginationCollection';

let Storefront = {

    install(Vue, options) {

        Vue.prototype.$event = new Vue();

        const cache = new InMemoryCache();

        const httpLink = new HttpLink({
            uri: `${options.domain}/api/graphql`,
            headers: {
                'X-Shopify-Storefront-Access-Token': options.storefrontAccessToken
            }
        });

        const defaultState = {
            checkoutID: {
                __typename: 'checkoutID',
                id: false
            }
        };

        const stateLink = withClientState({
            cache,
            defaults: defaultState,
            resolvers: {
                Mutation: {
                    updateCheckoutId(_, { id }, { cache }) {

                        const data = {
                            checkoutID: {
                                __typename: 'checkoutID',
                                id: id
                            }
                        }; 

                        cache.writeData({ data });
                    }
                }
            }
        });


        const apolloClient = new ApolloClient({
            link: ApolloLink.from([stateLink, httpLink]),
            cache: cache,
            connectToDevTools: true
        });

        Vue.use(VueApollo)

        const apolloProvider = new VueApollo({
            defaultClient: apolloClient
        });

        Vue.provider = function() {
            return apolloProvider.provide();
        }

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

        Vue.component('sf-price', Price);
        Vue.component('sf-error', Error);
        Vue.component('sf-loader', Loader);
        Vue.component('sf-pagination', Pagination);
        Vue.component('sf-pagination-collection', PaginationCollection);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsView },
                { path: '/product/:handle', component: ProductView },
                { path: '/collection/:handle', component: CollectionView },
                { path: '/tag/:handle', component: TagView },
                { path: '/vendor/:handle', component: VendorView },
                { path: '/type/:handle', component: ProductTypeView },
                { path: '/cart', component: CartView }
            ];

            options.router.addRoutes(routes);
        }

    }

    

};


export default Storefront;
