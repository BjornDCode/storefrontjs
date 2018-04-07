import gql from 'graphql-tag';
import CollectionFragment from '../fragments/collectionFragment';

export default gql `
    query Collection($handle: String!, $cursor: String) {
        shop {
            collectionByHandle(handle: $handle) {
                ...CollectionFragment
            }
        }
    }
    ${CollectionFragment}
`
