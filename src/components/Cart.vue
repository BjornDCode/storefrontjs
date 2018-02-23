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
                            <a href="#">
                                {{ lineItem.title }}
                            </a>
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

        <slot name="footer"></slot>
    </div>
</template>

<script>
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
            console.log(this.checkout)
        },

        methods: {
            createCheckout() {
                this.$store.dispatch('cart/createCheckout');
            },
            removeFromCart(e) {
                this.$store.dispatch('cart/removeLineItem', [e.currentTarget.value]);
            },

            updateQuantity(e) {
                const lineItem = [{
                    id: e.currentTarget.dataset.id,
                    quantity: Number(e.currentTarget.value)
                }];

                this.$store.dispatch('cart/updateQuantity', lineItem)
            }
        }
    }
</script>
