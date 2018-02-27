import {
    ALL_PRODUCTS_START,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    ACTIVE_PRODUCT_START,
    ACTIVE_PRODUCT_SUCCESS,
    ACTIVE_PRODUCT_FAIL,

    PRODUCTS_BY_TAG_START,
    PRODUCTS_BY_TAG_SUCCESS,
    PRODUCTS_BY_TAG_FAIL
} from './mutation-types';


export default {
    
    allProducts({commit}) {
        commit(ALL_PRODUCTS_START);

        return this._vm.$client.product.fetchAll()
            .then(products => commit(ALL_PRODUCTS_SUCCESS, products))
            .catch(error => commit(ALL_PRODUCTS_FAIL, error));
    },

    allProductsInTag({ commit }, handle) {
        commit(PRODUCTS_BY_TAG_START);

        return this._vm.$client.product.fetchQuery({ query: `tag:${handle}` })
            .then(products => commit(PRODUCTS_BY_TAG_SUCCESS, products))
            .catch(error => commit(PRODUCTS_BY_TAG_FAIL, error))
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
