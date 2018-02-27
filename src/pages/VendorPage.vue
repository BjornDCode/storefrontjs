<template>
    <div>
        <h1>{{ vendorName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            this.getProductsByVendor(this.$route.params.handle);
        },

        computed: {
            vendorName() {
                const handle = this.$route.params.handle;
                return handle.charAt(0).toUpperCase() + handle.slice(1);
            },
            products(){
                return this.$store.getters['products/allProductsByVendor'];
            }
        },

        methods: {
            getProductsByVendor(handle) {
                this.$store.dispatch('products/allProductsByVendor', handle);
            }
        }
    }
</script>
