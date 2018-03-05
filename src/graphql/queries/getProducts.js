import gql from 'graphql-tag';

export default gql`
    query Products($cursor: String) {
        shop {
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
`
