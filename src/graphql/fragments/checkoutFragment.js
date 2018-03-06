import gql from 'graphql-tag';
import ImageConnectionFragment from '../fragments/imageConnectionFragment';

export default gql`
    fragment CheckoutFragment on Checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        lineItems(first: 250) {
            edges {
                node {
                    id
                    title
                    quantity
                    variant {
                        id
                        price
                        selectedOptions {
                            name
                            value
                        }
                        product {
                            handle
                            vendor
                            images(first: 1) {
                                ...ImageConnectionFragment
                            }
                        }
                    }
                    customAttributes {
                        value
                    }
                }
            }
        }
    }
    ${ImageConnectionFragment}
`
