<template>
    <div class="product-card" v-if="product">
        <div class="product-card__image-container">
            <img :src="image.src" :alt="image.altText">
        </div>
        <div class="product-card__info">
            <router-link :to="productUrl">
                <h2 class="product-card__title">
                    {{ product.title }}
                </h2>
            </router-link>
            <div class="product-card__price">
                <sf-price :price="price"></sf-price>
            </div>
            <div class="product-card__description">
                {{ product.descriptionHtml }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },

        computed: {
            image() {
                return this.product.images.edges[0].node;
            },

            price() {
                return this.product.variants.edges[0].node.price;
            },

            productUrl() {
                return '/product/' + this.product.handle;
            }
        }
    }
</script>
