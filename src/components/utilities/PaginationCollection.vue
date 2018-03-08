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
                return this.data.products.pageInfo; 
            }
        },

        methods: {
            loadMore() {
                this.fetchingMore = true; 

                this.query.fetchMore({
                    variables: {
                        cursor: this.data.products.edges[this.data.products.edges.length - 1].cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        this.fetchingMore = false;
                        
                        return {
                            __typename: previousResult.shop.__typename,
                            shop: {
                                collectionByHandle: {
                                    __typename: previousResult.shop.collectionByHandle.__typename,
                                    ...previousResult.shop.collectionByHandle,
                                    products: {
                                        __typename: previousResult.shop.collectionByHandle.products.__typename,
                                        edges: [...previousResult.shop.collectionByHandle.products.edges, ...fetchMoreResult.shop.collectionByHandle.products.edges],
                                        pageInfo: fetchMoreResult.shop.collectionByHandle.products.pageInfo
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    }
</script>
