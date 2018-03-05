import gql from 'graphql-tag';
import ProductCardFragment from '../fragments/productCardFragment';

export default gql`
    fragment CollectionFragment on Collection {
        id
        title
        descriptionHtml,
        image {
            src
            altText
        }
        products(first: 10 after: $cursor) {
            ...ProductCardFragment
        }
    }
    ${ProductCardFragment}
`
