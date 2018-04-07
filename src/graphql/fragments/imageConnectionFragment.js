import gql from 'graphql-tag';
import ImageFragment from '../fragments/imageFragment';

export default gql`
    fragment ImageConnectionFragment on ImageConnection {
        edges {
            node {
                ...ImageFragment
            }
        }
    }
    ${ImageFragment}
`
