<template>
    <sf-product v-if="product" :product="product"></sf-product>
</template>

<script>
    import gql from 'graphql-tag';

    const GET_PRODUCT = gql `
        query Product($handle: String!){
            shop {
                productByHandle(handle: $handle) {
                    id,
                    title,
                    vendor,
                    descriptionHtml,
                    images(first: 20) {
                        edges {
                            node {
                                src,
                                altText
                            }
                        }
                    },
                    options {
                        name,
                        values
                    },
                    variants(first: 250) {
                        edges {
                            node {
                                id,
                                title,
                                price,
                                availableForSale,
                                selectedOptions {
                                    name, 
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    export default {
        data() {
            return {
                data: undefined
            }
        },

        apollo: {
            data: {
                query: GET_PRODUCT,
                variables() {
                    return {
                        handle: this.$route.params.handle   
                    }
                },
                update: data => data
            }
        },

        computed: {
            product() {
                if (!this.data) return;
                return this.data.shop.productByHandle;
            }
        }
    }
</script>
