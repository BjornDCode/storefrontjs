<template>
    <div class="product" v-if="product">
        <div class="product__image">
            <img :src="image.src" :alt="image.altText">
        </div>
        <div class="product__info">
            <h1>{{ product.title }}</h1>
            <p>{{ product.vendor }}</p>
            <div class="product__price">{{ price }}</div>
            <div class="product__description" v-html="product.descriptionHtml"></div>
            <sf-product-options-select :product="product" v-model="variant"></sf-product-options-select>
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

        data() {
            return {
                variant: 0            
            }
        },

        computed: {
            image() {
                return this.product.images[0];
            },

            price() {
                return this.product.variants[this.variant].price;
            }
        },

        methods: {
            

            
        }
    }
</script>
