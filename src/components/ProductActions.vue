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
    import cart from '../mixins/cart';
    import { ADD_LINE_ITEMS } from '../graphql/mutations';

    export default {
        mixins: [cart],

        props: {
            variantId: {
                type: String,
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
                this.$apollo.mutate({
                    mutation: ADD_LINE_ITEMS,
                    variables: {
                        lineItems: [{
                            quantity: this.quantity,
                            variantId: this.variantId
                        }],
                        checkoutId: this.checkout.id
                    },
                    update: (store, { data }) => {
                        this.checkout = data.checkoutLineItemsAdd.checkout;
                        this.$event.$emit('lineItemsCountUpdate', data.checkoutLineItemsAdd.checkout.lineItems.edges.length)
                    }
                })
            }
        }
    }
</script>
