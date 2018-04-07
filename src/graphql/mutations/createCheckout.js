import gql from 'graphql-tag';
import CheckoutFragment from '../fragments/checkoutFragment';

export default gql`
    mutation {
        checkoutCreate(input: {}) {
            userErrors {
                message, 
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`
