import gql from 'graphql-tag';
import ProductCardFragment from '../fragments/productCardFragment';
import ImageFragment from '../fragments/imageFragment';

export default gql`
    fragment CollectionFragment on Collection {
        id
        title
        descriptionHtml,
        image {
            ...ImageFragment
        }
        products(first: 10 after: $cursor) {
            ...ProductCardFragment
        }
    }
    ${ProductCardFragment}
    ${ImageFragment}
`
