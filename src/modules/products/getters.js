export default {
    allProducts: state => state.all,
    allProductsCount: (state, getters) => getters.allProducts.length,
    activeProduct: state => state.active,
    productByHandle: (state, getters) => (handle) => getters.allProducts.find(product => product.handle === handle),
    allProductsByTag: state => state.tag,
    allProductsByVendor: state => state.vendor,
    allProductsByType: state => state.type
};
