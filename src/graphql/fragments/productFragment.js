import gql from 'graphql-tag';

export default gql`
    fragment ProductFragment on Product {
        id
        title
        vendor
        descriptionHtml
        images(first: 20) {
            edges {
                node {
                    src,
                    altText
                }
            }
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
`
