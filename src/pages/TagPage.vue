<template>
    <div>
        <h1>{{ tagName }}</h1>

        <div v-if="error">
            <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
        </div>

        <div v-if="data">
            <sf-product-list :products="products"></sf-product-list>
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
                variables() {
                    return {
                        query: `tag:${this.handle}`
                    }
                },
                update: data => data,
                error: error => this.error = error
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle;
            },
            tagName() {
                return this.handle.charAt(0).toUpperCase() + this.handle.slice(1);
            },
            products() {
                return this.data.shop.products.edges.map(product => product.node);
            }
        }
    }
</script>
