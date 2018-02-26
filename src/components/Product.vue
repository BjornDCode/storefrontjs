<template>
    <div class="product" v-if="product" itemscope itemtype="http://schema.org/Product">
        <sf-product-images-slider 
            :product="product"
            mode="products"
        ></sf-product-images-slider>
        <div class="product__info">
            <h1>{{ product.title }}</h1>
            <p>{{ product.vendor }}</p>
            <sf-product-price :price="price" prefix="$"></sf-product-price>
            <sf-product-description :html="product.descriptionHtml"></sf-product-description>
            <sf-product-options-radio :product="product" v-model="variantIndex"></sf-product-options-radio>
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
                variantIndex: 0
            }
        },

        computed: {
            variant() {
                return this.product.variants[this.variantIndex];
            },
            price() {
                return this.variant.price;
            }
        },

        mounted() {
            console.log(this.variant)
        }
    }
</script>
