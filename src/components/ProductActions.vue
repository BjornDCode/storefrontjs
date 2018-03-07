<template>
    <div class="product__actions">

        <div v-if="error">
            <slot name="error">
                <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
            </slot>
        </div>

        <div v-if="success">
            <slot name="success">
                <p class="sucess">The product has been added to your cart.</p>
            </slot>
        </div>

        <button 
            @click="addToCart" 
            :class="loading ? 'loading' : ''" 
            :disable="loading"
        >
            Add To Cart
        </button>
        <div class="product__actions--quantity">
            <label for="quantity">Quantity</label>
            <input 
                type="number" 
                id="quantity" 
                v-model.number="quantity" 
                :disabled="loading"
            >
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
                quantity: 1,
                success: false,
                error: undefined,
                loading: false
            }
        },

        methods: {
            addToCart() {
                this.loading = true;

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
                .then(data => {
                    this.success = true;
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
                });
            }
        }
    }
</script>
