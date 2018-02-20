import {
    CREATE_CHECKOUT_START,
    CREATE_CHECKOUT_SUCCESS,
    CREATE_CHECKOUT_FAIL
} from './mutation-types';

export default {
    createCheckout({ commit, getters }) {
        commit(CREATE_CHECKOUT_START);

        return this._vm.$client.checkout.create()
            .then(checkout => commit(CREATE_CHECKOUT_SUCCESS, checkout))
            .catch(error => commit(CREATE_CHECKOUT_FAIL, error));
    }
}
