import gql from 'graphql-tag';
import CheckoutFragment from '../fragments/checkoutFragment';

export default gql`
    query checkoutQuery($id: ID!) {
        node(id: $id) {
            id
            ... on Checkout{
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`
