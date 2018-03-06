import gql from 'graphql-tag';
import ImageConnectionFragment from '../fragments/imageConnectionFragment';

export default gql`
    fragment ProductFragment on Product {
        id
        title
        vendor
        descriptionHtml
        images(first: 20) {
            ...ImageConnectionFragment
        }
        options {
            name
            values
        }
        variants(first: 250) {
            edges {
                node {
                    id
                    title
                    price
                    availableForSale
                    selectedOptions {
                        name
                        value
                    }
                }
            }
        }
    }
    ${ImageConnectionFragment}
`
