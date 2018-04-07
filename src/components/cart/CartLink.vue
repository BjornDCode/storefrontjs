<template>
    <router-link v-if="checkout" :to="{ name: 'cart' }">
        <slot :count="lineItemsCount">Cart ({{lineItemsCount}})</slot>
    </router-link>
</template>

<script>
    import cart from '../../mixins/cart';

    export default {
        mixins: [cart]
    }
</script>
