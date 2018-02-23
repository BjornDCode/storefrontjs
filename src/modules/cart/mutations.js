import {
    CREATE_CHECKOUT_START,
    CREATE_CHECKOUT_SUCCESS,
    CREATE_CHECKOUT_FAIL,

    ADD_TO_CART_START,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,

    REMOVE_FROM_CART_START,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,

    UPDATE_QUANTITY_START,
    UPDATE_QUANTITY_SUCCESS,
    UPDATE_QUANTITY_FAIL
} from './mutation-types';

export default {

    [CREATE_CHECKOUT_START] (state) {
        state.loading = true;
    },
    [CREATE_CHECKOUT_SUCCESS] (state, checkout) {
        state.loading = false;
        state.checkout = checkout;
    },
    [CREATE_CHECKOUT_FAIL] (state, error) {
        state.loading = false;
    },

    [ADD_TO_CART_START] (state) {
        state.loading = true;
    },
    [ADD_TO_CART_SUCCESS] (state, checkout) {
        state.loading = false;
        state.checkout = checkout;
    },
    [ADD_TO_CART_FAIL] (state, error) {
        state.loading = false;
    },

    [REMOVE_FROM_CART_START] (state) {
        state.loading = true;
    },
    [REMOVE_FROM_CART_SUCCESS] (state, checkout) {
        state.loading = false;
        state.checkout = checkout;
    },
    [REMOVE_FROM_CART_FAIL] (state, error) {
        state.loading = false;
    },

    [UPDATE_QUANTITY_START] (state) {
        state.loading = true;
    },
    [UPDATE_QUANTITY_SUCCESS] (state, checkout) {
        state.loading = false;
        state.checkout = checkout;
    },
    [UPDATE_QUANTITY_FAIL] (state, error){
        state.loading = false;
    }
}
