<template>
    <div class="product__actions">
        <button @click="addToCart">Add To Cart</button>
        <div class="product__actions--quantity">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" v-model.number="quantity">
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
                type: Number,
                required: true
            }
        },

        data() {
            return {
                quantity: 1
            }
        },

        methods: {
            addToCart() {
                const lineItem = [{
                    variantId: this.product.variants[this.variant].id,
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
