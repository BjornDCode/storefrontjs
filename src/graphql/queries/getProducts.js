import gql from 'graphql-tag';
import ProductCardFragment from '../fragments/productCardFragment';

export default gql`
    query Products($cursor: String, $query: String) {
        shop {
            products(first: 10 after: $cursor query: $query) {
                ...ProductCardFragment
            }
        }
    }
    ${ProductCardFragment}
`
