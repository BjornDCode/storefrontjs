import {
    ALL_PRODUCTS_START,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ACTIVE_PRODUCT_START,
    ACTIVE_PRODUCT_SUCCESS,
    ACTIVE_PRODUCT_FAIL,
} from './mutation-types';


export default {
    
    allProducts({commit}) {
        commit(ALL_PRODUCTS_START);

        return this._vm.$client.product.fetchAll()
            .then(products => {
                commit(ALL_PRODUCTS_SUCCESS, products);
            })
            .catch(error => {
                commit(ALL_PRODUCTS_FAIL, error);
            });
    },
    activeProduct({commit, getters}, handle) {
        commit(ACTIVE_PRODUCT_START);

        if (getters.allProductsCount) {
            commit(ACTIVE_PRODUCT_SUCCESS, getters.productByHandle(handle));
        } else {
            return this._vm.$client.product.fetchByHandle(handle).then(product => {
                commit(ACTIVE_PRODUCT_SUCCESS, product);
            });
        }
    },

}
