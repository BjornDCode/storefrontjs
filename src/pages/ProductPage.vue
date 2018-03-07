<template>
    <div>
        <div v-if="$apollo.loading">
            <sf-loader></sf-loader>
        </div>
        
        <div v-if="error">
            <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
        </div>
        
        <sf-product v-if="product" :product="product"></sf-product>
    </div>
</template>

<script>
    import { GET_PRODUCT } from '../graphql/queries';

    export default {
        data() {
            return {
                product: undefined,
                error: undefined
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
                update: data => data.shop.productByHandle,
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
