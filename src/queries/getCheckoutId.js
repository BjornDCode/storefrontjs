import gql from 'graphql-tag';

export default gql`
    query {
        checkoutID @client {
            id
        }
    }
`
