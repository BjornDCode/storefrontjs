import gql from 'graphql-tag';
import CheckoutFragment from '../fragments/checkoutFragment';

export default gql `
    mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
                field
                message
            }
            checkout {
                ... CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`
