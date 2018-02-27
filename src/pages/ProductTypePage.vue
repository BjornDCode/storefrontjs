<template>
    <div>
        <h1>{{ typeName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            const query = this.$route.params.handle.replace(/-/i, ' ');
            this.getProductsByType(query);
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
            getProductsByType(query) {
                this.$store.dispatch('products/allProductsByType', query);
            }
        }
    }
</script>
