export default {
    allProducts: state => state.shop.products.all,
    allProductsCount: (state, getters) => getters.allProducts.length,
    activeProduct: state => state.shop.products.active,
    productById: (state, getters) => (id) => getters.allProducts.find(product => product.id === id)
};
