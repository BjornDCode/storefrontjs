<template>
    <div class="product-card" v-if="product">
        <slot name="image">
            <div class="product-card__image-container">
                <img :src="image.src" :alt="image.altText">
            </div>
        </slot>
        <slot name="info">
            <div class="product-card__info">
                <router-link :to="{ name: 'product', params: { handle: product.handle } }">
                    <h2 class="product-card__title">
                        {{ product.title }}
                    </h2>
                </router-link>
                <div class="product-card__price">
                    <sf-price :price="price"></sf-price>
                </div>
            </div>
        </slot>
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
            }
        }
    }
</script>
