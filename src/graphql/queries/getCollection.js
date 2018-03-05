import gql from 'graphql-tag';

export default gql `
    query Collection($handle: String!, $cursor: String) {
        shop {
            collectionByHandle(handle: $handle) {
                id
                title
                descriptionHtml,
                image {
                    src
                    altText
                }
                products(first: 10 after: $cursor) {
                    edges {
                        cursor,
                        node {
                            title,
                            handle,
                            descriptionHtml,
                            images(first: 1) {
                                edges {
                                    node {
                                        src,
                                        altText
                                    }
                                }
                            },
                            variants(first: 1) {
                                edges {
                                    node {
                                        price
                                    }
                                }
                            }
                        }
                    },
                    pageInfo {
                        hasNextPage,
                        hasPreviousPage
                    }
                }
            }
        }
    }
`
