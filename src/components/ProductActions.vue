<template>
    <div class="product__actions">
        <button @click="addToCart" :disable="cartLoading">Add To Cart</button>
        <div class="product__actions--quantity">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" v-model.number="quantity" :disabled="cartLoading">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            variant: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                quantity: 1
            }
        },

        computed: {
            cartLoading() {
                return this.$store.getters['cart/isLoading'];
            }
        },

        methods: {
            addToCart() {
                const lineItem = [{
                    variantId: this.variant.id,
                    quantity: this.quantity
                }];

                this.addProductToCart(lineItem);
            },

            addProductToCart(lineItem) {
                this.$store.dispatch('cart/addToCart', lineItem);
            }
        }
    }
</script>
