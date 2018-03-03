import gql from 'graphql-tag';
import CheckoutFragment from '../fragments/checkoutFragment';

export default gql`
    mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
        checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
            userErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`
