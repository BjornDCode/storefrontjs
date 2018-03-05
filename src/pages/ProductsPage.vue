<template>
    <div>
        <h1>Products</h1>

        <div v-if="data">
            <sf-product-list :products="products"></sf-product-list>
            <button v-if="pageInfo.hasNextPage" @click="loadMore">Load More</button>
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
                update: data => data
            }
        },

        computed: {
            products() {
                return this.data.shop.products.edges.map(product => product.node);
            },
            pageInfo() {
                return this.data.shop.products.pageInfo;
            }
        },

        methods: {
            loadMore() {
                this.$apollo.queries.data.fetchMore({
                    variables: {
                        cursor: this.data.shop.products.edges[this.data.shop.products.edges.length - 1].cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {

                        return {
                            __typename: previousResult.shop.__typename,
                            shop: {
                                products: {
                                    __typename: previousResult.shop.products.__typename,
                                    edges: [...previousResult.shop.products.edges, ...fetchMoreResult.shop.products.edges],
                                    pageInfo: fetchMoreResult.shop.products.pageInfo
                                }
                            }
                        }
                    }
                })
            }
        }
    }
</script>
