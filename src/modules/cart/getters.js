export default {
    checkout: state => state.checkout,
    lineItems: (state, getters) => getters.checkout.lineItems,
    isLoading: state => state.loading
    // cartCount: (state, getters) => getters.lineItems.length
}
