import {
    CREATE_CHECKOUT_START,
    CREATE_CHECKOUT_SUCCESS,
    CREATE_CHECKOUT_FAIL,

    ADD_TO_CART_START,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL
} from './mutation-types';

export default {

    createCheckout({ commit, getters }) {
        commit(CREATE_CHECKOUT_START);

        return this._vm.$client.checkout.create()
            .then(checkout => commit(CREATE_CHECKOUT_SUCCESS, checkout))
            .catch(error => commit(CREATE_CHECKOUT_FAIL, error));
    },

    addToCart({ commit, getters, dispatch }, lineItem) {
        if (!this.checkout) {
            dispatch('createCheckout').then(() => {
                dispatch('addLineItem', lineItem);
            })
        } else {
            dispatch('addLineItem', lineItem);
        }
    },
    addLineItem({ commit, getters }, lineItem) {
        commit(ADD_TO_CART_START);

        return this._vm.$client.checkout.addLineItems(getters.checkout.id, lineItem)
            .then(checkout => commit(ADD_TO_CART_SUCCESS, checkout))
            .catch(error => commit(ADD_TO_CART_FAIL, error))
    }

}
