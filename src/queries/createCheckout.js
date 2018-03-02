import gql from 'graphql-tag';

export default gql`
  mutation {
    checkoutCreate(input: {}) {
      userErrors {
        message, 
        field
      }
      checkout {
        id,
        webUrl,
        lineItems(first: 250) {
          edges {
            node {
              title,
              quantity,
              variant {
                id,
                price,
                product {
                  handle,
                  images(first: 1) {
                    edges {
                      node {
                        altText,
                        originalSrc
                      }
                    }
                  }
                }
              },
              customAttributes {
                value
              },
            }
          }
        }
      }
    }
  }
`
