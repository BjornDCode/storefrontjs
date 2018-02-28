<template>
    <div class="product-list">
        
        <slot name="header"></slot>   

        <slot v-for="product in products" :product="product">
            <sf-product-card  :product="product"></sf-product-card>
        </slot>

        <slot name="footer"></slot>

    </div>
</template>

<script>
    export default {
        props: {
            products: {
                type: Array,
                required: true
            }
        },

        mounted() {
            console.log('list', this.products)
        }
    }
</script>
