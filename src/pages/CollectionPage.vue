<template>
    <div>
        <div v-if="$apollo.loading">
            <sf-loader></sf-loader>
        </div>
        
        <div v-if="error">
            <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
        </div>
    
        <div class="collection" v-if="collection">
            <div class="collection__image">
                <img :src="collection.image.src" :alt="collection.image.altText">
            </div>
            <div class="collection__info">
                <h1 class="collection__info--title">{{ collection.title }}</h1>
                <div class="collection__info--description">{{ collection.descriptionHtml }}</div>
            </div>
            <div class="collection__products">
                <h2>Products</h2>
                <sf-product-list :products="products"></sf-product-list>

                <sf-pagination-collection
                    :query="$apollo.queries.collection"
                    :data="collection"
                ></sf-pagination-collection>
            </div>
        </div>
    </div>
</template>


<script>
    import { GET_COLLECTION } from '../graphql/queries';

    export default {
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
                        handle: this.handle
                    }
                },
                update: data => data.shop.collectionByHandle,
                error: error => this.error = error
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle;
            },

            products() {
                return this.collection.products.edges.map(product => product.node);
            }
        }

    }
</script>
