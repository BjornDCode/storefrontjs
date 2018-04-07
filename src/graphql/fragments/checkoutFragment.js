import gql from 'graphql-tag';
import ImageFragment from '../fragments/imageFragment';
import ImageConnectionFragment from '../fragments/imageConnectionFragment';

export default gql`
    fragment CheckoutFragment on Checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        completedAt
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
                        image {
                            ...ImageFragment
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
    ${ImageFragment}
    ${ImageConnectionFragment}
`
