import gql from 'graphql-tag';

export default gql`
    query Product($handle: String!){
        shop {
            productByHandle(handle: $handle) {
                id,
                title,
                vendor,
                descriptionHtml,
                images(first: 20) {
                    edges {
                        node {
                            src,
                            altText
                        }
                    }
                },
                options {
                    name,
                    values
                },
                variants(first: 250) {
                    edges {
                        node {
                            id,
                            title,
                            price,
                            availableForSale,
                            selectedOptions {
                                name, 
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`
