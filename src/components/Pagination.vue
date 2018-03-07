<template>
    <div class="pagination">
        <div v-if="fetchingMore">
            <sf-loader></sf-loader>
        </div>
        <button 
            v-if="pageInfo.hasNextPage" 
            @click="loadMore"
            :disabled="fetchingMore"
        >
            Load More
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            query: {
                type: Object,
                required: true
            },
            data: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                fetchingMore: false
            }
        },

        computed: {
            pageInfo() {
                return this.data.shop.products.pageInfo;
            }
        },

        methods: {
            loadMore() {
                this.fetchingMore = true; 

                this.query.fetchMore({
                    variables: {
                        cursor: this.data.shop.products.edges[this.data.shop.products.edges.length - 1].cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        this.fetchingMore = false;

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
