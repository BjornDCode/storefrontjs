import gql from 'graphql-tag';
import ProductFragment from '../fragments/productFragment';

export default gql`
    query Product($handle: String!){
        shop {
            productByHandle(handle: $handle) {
                ...ProductFragment
            }
        }
    }
    ${ProductFragment}
`
