import {
    ALL_PRODUCTS_START,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ACTIVE_PRODUCT_START,
    ACTIVE_PRODUCT_SUCCESS,
    ACTIVE_PRODUCT_FAIL,
} from './mutation-types';

export default {

    [ALL_PRODUCTS_START] (state) => {
        state.loading = true;
    },
    [ALL_PRODUCTS_FAIL] (state) => {
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
    }
    
}
