<template>
    <div class="product" v-if="product">
        <sf-product-images-gallery 
            :product="product"
            mode="products"
        ></sf-product-images-gallery>
        <div class="product__info">
            <h1>{{ product.title }}</h1>
            <p>{{ product.vendor }}</p>
            <div class="product__price">{{ price }}</div>
            <sf-product-description :html="product.descriptionHtml"></sf-product-description>
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
            price() {
                return this.product.variants[this.variant].price;
            }
        }
    }
</script>
