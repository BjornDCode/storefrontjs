<template>
    <div>
        <h1>{{ typeName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            this.getProductsByType(this.$route.params.handle);
        },

        computed: {
            typeName() {
                const handle = this.$route.params.handle;
                return handle.charAt(0).toUpperCase() + handle.slice(1);
            },
            products(){
                return this.$store.getters['products/allProductsByType'];
            }
        },

        methods: {
            getProductsByType(handle) {
                this.$store.dispatch('products/allProductsByType', handle);
            }
        }
    }
</script>
