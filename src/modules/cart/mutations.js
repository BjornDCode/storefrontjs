import {
    CREATE_CHECKOUT_START,
    CREATE_CHECKOUT_SUCCESS,
    CREATE_CHECKOUT_FAIL
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
    }

}
