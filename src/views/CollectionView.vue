<template>
    <div class="collection-view">
        <div v-if="$apollo.loading">
            <sf-loader></sf-loader>
        </div>
        
        <div v-if="error">
            <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
        </div>
    
        <div v-if="collection">
            <sf-collection :collection="collection" :query="$apollo.queries.collection">
                <!-- Output $slots here -->
            </sf-collection>
        </div>
    </div>
</template>


<script>
    import { GET_COLLECTION } from '../graphql/queries';

    export default {
        props: {
            collectionHandle: {
                type: String,
                required: false
            } 
        },

        data() {
            return {
                collection: undefined,
                error: undefined
            }
        },

        apollo: {
            collection: {
                query: GET_COLLECTION,
                variables() {
                    return {
                        handle: this.collectionHandle || this.handle
                    }
                },
                update: data => data.shop.collectionByHandle,
                error: error => this.error = error
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle;
            }
        }

    }
</script>
