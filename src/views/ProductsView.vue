<template>
    <div class="products-view">
        <h1>Products</h1>

        <div v-if="$apollo.loading">
            <sf-loader></sf-loader>
        </div>

        <div v-if="error">
            <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
        </div>

        <div v-if="data">
            <sf-product-list :products="products"></sf-product-list>

            <sf-pagination
                :query="$apollo.queries.data"
                :data="data" 
            ></sf-pagination>

            <div v-if="!products.length">
                Sorry, no products at the moment
            </div>
        </div>
    </div>
</template>

<script>
    import { GET_PRODUCTS } from '../graphql/queries';

    export default {
        data() {
            return {
                data: undefined,
                error: undefined
            }
        },

        apollo: {
            data: {
                query: GET_PRODUCTS,
                update: data => data,
                error: error => this.error = error
            }
        },

        computed: {
            products() {
                return this.data.shop.products.edges.map(product => product.node);
            }
        }
    }
</script>
