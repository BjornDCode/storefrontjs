<template>
    <router-link v-if="checkout" to="/cart">
        <slot :count="lineItems.length">Cart ({{lineItems.length}})</slot>
    </router-link>
</template>

<script>
    export default {
        created() {
            if (!this.checkout) {
                this.createCheckout();
            }
        },

        computed: {
            checkout() {
                return this.$store.getters['cart/checkout'];
            },
            lineItems() {
                return this.$store.getters['cart/lineItems'];
            }
        },

        methods: {
            createCheckout() {
                this.$store.dispatch('cart/createCheckout');
            },
        }

    }
</script>
