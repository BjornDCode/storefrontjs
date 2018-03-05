<template>
    <sf-product v-if="product" :product="product"></sf-product>
</template>

<script>
    import { GET_PRODUCT } from '../graphql/queries';

    export default {
        data() {
            return {
                product: undefined
            }
        },

        apollo: {
            product: {
                query: GET_PRODUCT,
                variables() {
                    return {
                        handle: this.handle  
                    }
                },
                update: data => data.shop.productByHandle
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle;
            }
        }
    }
</script>
