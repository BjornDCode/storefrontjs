import {
    ALL_COLLECTIONS_START,
    ALL_COLLECTIONS_SUCCESS,
    ALL_COLLECTIONS_FAIL,
    ACTIVE_COLLECTION_START,
    ACTIVE_COLLECTION_SUCCESS,
    ACTIVE_COLLECTION_FAIL,
} from './mutation-types';


export default {

    allCollections({ commit }) {
        commit(ALL_COLLECTIONS_START);

        return this._vm.$client.collection.fetchAllWithProducts()
            .then(collections => commit(ALL_COLLECTIONS_SUCCESS, collections))
            .catch(error => commit(ALL_COLLECTIONS_FAIL, error));
    },
    activeCollection({commit, getters}, handle) {
        commit(ACTIVE_COLLECTION_START);

        if (getters.allCollectionsCount) {
            commit(ACTIVE_COLLECTION_SUCCESS, getters.collectionByHandle(handle));
        } else {
            return this._vm.$client.collection.fetchByHandle(handle)
            .then(collection => commit(ACTIVE_COLLECTION_SUCCESS, collection))
            .catch(error => commit(ACTIVE_COLLECTION_FAIL, error));
        }
    }

}
