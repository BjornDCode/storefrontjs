import gql from 'graphql-tag';

export default gql`
    fragment ProductCardFragment on ProductConnection {
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
`
