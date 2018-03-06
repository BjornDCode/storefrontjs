import gql from 'graphql-tag';

export default gql`
    fragment ImageFragment on Image {
        altText
        src 
    }
`
