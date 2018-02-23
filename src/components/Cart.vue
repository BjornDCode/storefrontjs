<template>
    <div class="cart" v-if="checkout">
        <slot name="header"></slot>

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
                            <!-- <a :href="'/product/' + lineItem.variant.product.handle"> -->
                                {{ lineItem.title }}
                            <!-- </a> -->
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
                                :disabled="loading" 
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

        <div class="cart__summary">
            <div class="cart__summary--total">
                Subtotal: <span>{{ checkout.subtotalPrice }}</span>
            </div>
        </div>

        <div class="cart__actions">
            <a :href="checkout.webUrl" class="cart__actions--checkout">
                Checkout
            </a>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<script>
    import { debounce } from 'lodash';

    export default {
        computed: {
            checkout() {
                return this.$store.getters['cart/checkout'];
            },
            lineItems() {
                return this.$store.getters['cart/lineItems'];
            },
            loading() {
                return this.$store.getters['cart/isLoading'];
            }
        },

        created() {
            if (!this.checkout) {
                this.createCheckout();
            }
        },

        mounted() {
            if (this.$route.query.hasOwnProperty('clear')) {
                this.createCheckout();
            }
            console.log(this.checkout)
        },

        methods: {
            createCheckout() {
                this.$store.dispatch('cart/createCheckout');
            },
            removeFromCart(e) {
                this.$store.dispatch('cart/removeLineItem', [e.currentTarget.value]);
            },
            updateQuantity: debounce(function(e) {
                const lineItem = [{
                    id: e.target.dataset.id,
                    quantity: Number(e.target.value)
                }];

                this.$store.dispatch('cart/updateQuantity', lineItem)
            }, 500)
        }
    }
</script>
