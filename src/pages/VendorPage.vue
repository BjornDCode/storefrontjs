<template>
    <div>
        <h1>{{ vendorName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            const query = this.$route.params.handle.replace(/-/i, ' ');
            this.getProductsByVendor(query);
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
            getProductsByVendor(query) {
                this.$store.dispatch('products/allProductsByVendor', query);
            }
        }
    }
</script>
