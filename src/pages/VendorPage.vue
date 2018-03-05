<template>
    <div>
        <h1>{{ vendorName }}</h1>
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
                data: undefined
            }
        },

        apollo: {
            data: {
                query: GET_PRODUCTS,
                variables() {
                    return {
                        query: `vendor:${this.handle}`
                    }
                },
                update: data => data
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle;
            },
            vendorName() {
                return this.handle.charAt(0).toUpperCase() + this.handle.slice(1);
            },
            products() {
                return this.data.shop.products.edges.map(product => product.node);
            }
        }
    }
</script>
