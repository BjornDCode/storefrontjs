import gql from 'graphql-tag';
import ProductCardFragment from '../fragments/productCardFragment';

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
                    ...ProductCardFragment
                }
            }
        }
    }
    ${ProductCardFragment}
`
