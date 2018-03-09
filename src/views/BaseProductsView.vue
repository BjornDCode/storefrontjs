<template>
    <div class="vendor-view">
        <h1>{{ pageName }}</h1>

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
                Sorry, no products in this category
            </div>
        </div>
    </div>
</template>

<script>
    import { GET_PRODUCTS } from '../graphql/queries';

    export default {
        props: {
            type: {
                type: String,
                required: false
            }
        },

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
                    if (!this.type) return { query: undefined }
                    return {
                        query: `${this.type}:${this.handle}`
                    }
                },
                update: data => {
                    return data
                },
                error: error => this.error = error
            }
        },

        computed: {
            handle() {
                return this.$route.params.handle.replace('-', ' ');
            },

            pageName() {
                if (!this.handle) return 'Products';

                return this.convertHandleToTitle(this.handle);
            },

            products() {
                return this.data.shop.products.edges.map(product => product.node);
            }
        },

        methods: {
            convertHandleToTitle(text) {
                return text.replace(/\w\S*/g, (word) => {
                    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
                })
            }
        }
    }
</script>
