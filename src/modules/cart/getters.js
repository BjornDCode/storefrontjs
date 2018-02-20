export default {
    checkout: state => state.checkout,
    lineItems: (state, getters) => getters.checkout.lineItems,
    cartCount: (state, getters) => getters.lineItems.length
}
