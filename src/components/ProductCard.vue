<template>
    <div class="product-card" v-if="product">
        <div class="product-card__image-container">
            <img :src="image.src" :alt="image.altText">
        </div>
        <div class="product-card__info">
            <a :href="'/product/' + product.handle">
                <h2 class="product-card__title">
                    {{ product.title }}
                </h2>
            </a>
            <div class="product-card__price">
                {{ price }}
            </div>
            <div class="product-card__description">
                {{ product.description }}
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
                return this.product.images[0];
            },

            price() {
                return this.product.variants[0].price;
            }
        }
    }
</script>
