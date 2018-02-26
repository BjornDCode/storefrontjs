<template>
    <div class="product" v-if="product">
        <sf-product-images-slider 
            :product="product"
            mode="products"
        ></sf-product-images-slider>
        <div class="product__info">
            <h1>{{ product.title }}</h1>
            <p>{{ product.vendor }}</p>
            <sf-product-price :price="price" prefix="$"></sf-product-price>
            <sf-product-description :html="product.descriptionHtml"></sf-product-description>
            <sf-product-options-select :product="product" v-model="variant"></sf-product-options-select>
            <sf-product-actions :product="product" :variant="variant"></sf-product-actions>
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
