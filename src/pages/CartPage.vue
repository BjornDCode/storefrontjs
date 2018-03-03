<template>
    <sf-cart v-if="checkout" :checkout="checkout"></sf-cart>
</template>

<script>
    import cart from '../mixins/cart';

    export default {
        mixins: [cart]
    }
</script>
