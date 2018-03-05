import gql from 'graphql-tag';

export default gql`
    mutation updateCheckoutId($id: String!) {
        updateCheckoutId(id: $id) @client {
            id
        }
    }
`
