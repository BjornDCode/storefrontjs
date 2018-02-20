<template>
    <sf-product v-if="product" :product="product"></sf-product>
</template>

<script>
    export default {
        
        created() {
            this.getActiveProduct(this.$route.params.handle);
        },

        computed: {
            product() {
                return this.$store.getters['products/activeProduct'];
            }
        },

        methods: {
            getActiveProduct(handle) {
                this.$store.dispatch('products/activeProduct', handle);
            }
        }

    }
</script>
