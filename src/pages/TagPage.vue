<template>
    <div>
        <h1>{{ tagName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            this.getProductsByTag(this.$route.params.handle);
        },

        computed: {
            tagName() {
                const handle = this.$route.params.handle;
                return handle.charAt(0).toUpperCase() + handle.slice(1);
            },
            products(){
                return this.$store.getters['products/allProductsInTag'];
            }
        },

        methods: {
            getProductsByTag(handle) {
                this.$store.dispatch('products/allProductsInTag', handle);
            }
        }
    }
</script>
