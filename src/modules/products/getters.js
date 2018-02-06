export default {
    allProducts: state => state.all,
    allProductsCount: (state, getters) => getters.allProducts.length,
    activeProduct: state => state.active,
    productById: (state, getters) => (id) => getters.allProducts.find(product => product.id === id)
};
