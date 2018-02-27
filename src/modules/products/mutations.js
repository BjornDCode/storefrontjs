import {
    ALL_PRODUCTS_START,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    ACTIVE_PRODUCT_START,
    ACTIVE_PRODUCT_SUCCESS,
    ACTIVE_PRODUCT_FAIL,

    PRODUCTS_BY_TAG_START,
    PRODUCTS_BY_TAG_SUCCESS,
    PRODUCTS_BY_TAG_FAIL,

    PRODUCTS_BY_VENDOR_START,
    PRODUCTS_BY_VENDOR_SUCCESS,
    PRODUCTS_BY_VENDOR_FAIL,

    PRODUCTS_BY_TYPE_START,
    PRODUCTS_BY_TYPE_SUCCESS,
    PRODUCTS_BY_TYPE_FAIL
} from './mutation-types';

export default {

    [ALL_PRODUCTS_START] (state) {
        state.loading = true;
    },
    [ALL_PRODUCTS_FAIL] (state) {
        state.loading = false;
    },
    [ALL_PRODUCTS_SUCCESS] (state, products) {
        state.loading = false;
        state.all = products;
    },

    [ACTIVE_PRODUCT_START] (state) {
        state.loading = true;
    },
    [ACTIVE_PRODUCT_FAIL] (state) {
        state.loading = false;
    },
    [ACTIVE_PRODUCT_SUCCESS] (state, product) {
        state.loading = false;
        state.active = product;
    },

    [PRODUCTS_BY_TAG_START] (state) {
        state.loading = true;
    },
    [PRODUCTS_BY_TAG_SUCCESS] (state, products) {
        state.loading = false;
        state.tag = products;
    },
    [PRODUCTS_BY_TAG_FAIL] (state, error) {
        state.loading = false;
    },

    [PRODUCTS_BY_VENDOR_START] (state) {
        state.loading = true;
    },
    [PRODUCTS_BY_VENDOR_SUCCESS] (state, products) {
        state.loading = false;
        state.vendor = products;
    },
    [PRODUCTS_BY_VENDOR_FAIL] (state, error) {
        state.loading = false;
    },

    [PRODUCTS_BY_TYPE_START] (state) {
        state.loading = true;
    },
    [PRODUCTS_BY_TYPE_SUCCESS] (state, products) {
        state.loading = false;
        state.type = products;
    },
    [PRODUCTS_BY_TYPE_FAIL] (state, error) {
        state.loading = false;
    }
    
}
