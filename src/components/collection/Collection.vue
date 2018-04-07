<template>
    <div class="collection">
        <slot name="header">
            <div class="collection__image" v-if="collection.image">
                <img :src="collection.image.src" :alt="collection.image.altText">
            </div>
            <div class="collection__info">
                <h1 class="collection__info--title">{{ collection.title }}</h1>
                <div class="collection__info--description">{{ collection.descriptionHtml }}</div>
            </div>
        </slot>

        <slot name="products-container">
            <div class="collection__products">
                <h2>Products</h2>
                <slot name="products" :products="products">
                    <sf-product-list :products="products">
                    </sf-product-list>
                </slot>

                <sf-pagination-collection
                    :query="query"
                    :data="collection"
                ></sf-pagination-collection>

                <div v-if="!products.length">
                    Sorry, no products in this category 
                </div>
            </div>
        </slot>

        <slot name="footer"></slot>
    </div>
</template>

<script>
    export default {
        props: {
            collection: {
                type: Object,
                required: true
            },
            query: {
                type: Object,
                required: true
            }
        },

        computed: {
            products() {
                return this.collection.products.edges.map(product => product.node);
            }
        }
    }
</script>
