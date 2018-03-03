<template>
    <div class="cart">
        <slot name="header"></slot>

        <p>CART</p>

        <div v-if="lineItems.length">
            <div class="cart--table">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(lineItem, index) in lineItems">
                            <td>
                                <router-link :to="'/product/' + lineItem.variant.product.handle">
                                    {{ lineItem.title }}
                                </router-link>
                            </td>
                            <td>
                                <span>
                                    {{ lineItem.variant.price }}
                                </span>
                            </td>
                            <td>
                                <input 
                                    @change="updateQuantity" 
                                    type="number" 
                                    :data-id="lineItem.id"
                                    :value="lineItem.quantity"
                                >
                            </td>
                            <td>
                                <span v-text="lineItem.variant.price * lineItem.quantity"></span>
                            </td>
                            <td>
                                <button @click="removeFromCart" :value="lineItem.id">
                                    &times;
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- <div class="cart__summary">
                <div class="cart__summary--total">
                    Subtotal: <span>{{ checkout.subtotalPrice }}</span>
                </div>
            </div> -->

            <!-- <div class="cart__actions">
                <a :href="checkout.webUrl" class="cart__actions--checkout">
                    Checkout
                </a>
            </div> -->
        </div>
        <div v-else>
            <p>The cart is empty.</p>
        </div>
        

        <slot name="footer"></slot>
    </div>
</template>

<script>
    import { UPDATE_LINE_ITEMS } from '../graphql/mutations';

    export default {
        props: {
            checkout: {
                type: Object,
                required: true
            }
        },

        computed: {
            lineItems: {
                get() {
                    return this.checkout.lineItems.edges.map(lineItem => lineItem.node);
                },
                set(lineItems) {
                    return lineItems;
                }
            },
            // loading: {
            //     get() {
            //         return false;
            //     },
            //     set(loadingState) {
            //         return loadingState;
            //     }
            // }
        },

        mounted() {
            console.log('checkout', this.checkout)
        },

        methods: {

            updateQuantity(e) {
                this.$apollo.mutate({
                    mutation: UPDATE_LINE_ITEMS,
                    variables: {
                        checkoutId: this.checkout.id,
                        lineItems: [{
                            id: e.target.dataset.id,
                            quantity: Number(e.target.value)
                        }]
                    },
                    update: (store, { data }) => {
                        this.lineItems = data.checkoutLineItemsUpdate.checkout.lineItems.edges.map(lineItem => lineItem.node);
                    }
                });
            },

            removeFromCart() {
                console.log('removeFromCart');
            }

        }
    }
</script>
