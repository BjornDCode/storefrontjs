import {
    ALL_COLLECTIONS_START,
    ALL_COLLECTIONS_SUCCESS,
    ALL_COLLECTIONS_FAIL,
    ACTIVE_COLLECTION_START,
    ACTIVE_COLLECTION_SUCCESS,
    ACTIVE_COLLECTION_FAIL,
} from './mutation-types';

export default {

    [ALL_COLLECTIONS_START] (state) {
        state.loading = true;
    },
    [ALL_COLLECTIONS_SUCCESS] (state, collections) {
        state.loading = false;
        state.all = collections;
    },
    [ALL_COLLECTIONS_FAIL] (state, error) {
        state.loading = false;
    },

    [ACTIVE_COLLECTION_START] (state) {
        state.loading = true;
    },
    [ACTIVE_COLLECTION_SUCCESS] (state, collection) {
        state.loading = false;
        state.active = collection;
    },
    [ACTIVE_COLLECTION_FAIL] (state, error) {
        state.loading = false;
    }

}
