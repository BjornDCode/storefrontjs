export default {
    allCollections: state => state.all,
    allCollectionsCount: (state, getters) => getters.allCollections.lenght,
    activeCollection: state => state.active,
    collectionByHandle: (state, getters) => (handle) => getters.allCollections.find(collection => collection.handle === handle),
    // allProductsInCollection: (state, getters) => (collection) => 
};
