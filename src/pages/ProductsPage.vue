<template>
    <div>
        <h1>Products</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
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
                console.log('PRODUCTS', this.$store.getters['products/allProducts'])
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
