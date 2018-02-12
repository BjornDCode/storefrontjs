<template>
    <sf-product-list :products="products"></sf-product-list>
</template>

<script>
    export default {
        created() {
            if (!this.productsCount) {
                this.getAllProducts();
            }
        },

        computed: {
            productsCount() {
                return this.$store.getters['products/allProductsCount'];
            },
            products() {
                return this.$store.getters['products/allProducts'];
            }
        },

        methods: {
            getAllProducts() {
                this.$store.dispatch('products/allProducts');
            }
        }
    }
</script>
