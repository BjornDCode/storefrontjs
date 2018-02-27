<template>
    <div>
        <h1>{{ tagName }}</h1>
        <sf-product-list :products="products"></sf-product-list>
    </div>
</template>

<script>
    export default {
        created() {
            const query = this.$route.params.handle.replace(/-/i, ' ');
            this.getProductsByTag(query);
        },

        computed: {
            tagName() {
                const handle = this.$route.params.handle;
                return handle.charAt(0).toUpperCase() + handle.slice(1);
            },
            products(){
                return this.$store.getters['products/allProductsByTag'];
            }
        },

        methods: {
            getProductsByTag(query) {
                this.$store.dispatch('products/allProductsByTag', query);
            }
        }
    }
</script>
