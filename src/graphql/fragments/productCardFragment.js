import gql from 'graphql-tag';
import ImageConnectionFragment from '../fragments/imageConnectionFragment';

export default gql`
    fragment ProductCardFragment on ProductConnection {
        edges {
            cursor,
            node {
                title,
                handle,
                vendor,
                images(first: 1) {
                    ...ImageConnectionFragment
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
    ${ImageConnectionFragment}
`
