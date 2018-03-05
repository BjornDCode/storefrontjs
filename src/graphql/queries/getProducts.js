import gql from 'graphql-tag';

export default gql`
    query Products($cursor: String, $query: String) {
        shop {
            products(first: 10 after: $cursor query: $query) {
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
`
