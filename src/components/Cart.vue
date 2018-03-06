<template>
    <div class="cart">
        <slot name="header"></slot>

        <div v-if="lineItems.length">
            <slot name="lineItems">
                <div class="cart--table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
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
                                    <img 
                                        :src="lineItem.variant.product.images.edges[0].node.src" 
                                        :alt="lineItem.variant.product.images.edges[0].node.altText"
                                    >
                                </td>
                                <td>
                                    <router-link :to="'/product/' + lineItem.variant.product.handle">
                                        {{ lineItem.title }}
                                    </router-link>
                                    <div>
                                        <span>
                                            {{ lineItem.variant.product.vendor }}
                                        </span>
                                    </div>
                                    <dl>
                                        <div v-for="option in lineItem.variant.selectedOptions">
                                            <dt>{{ option.name }}:</dt> <dd>{{ option.value }}</dd>
                                        </div>
                                    </dl>
                                </td>
                                <td>
                                    <sf-price :price="lineItem.variant.price"></sf-price>
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
                                    <sf-price :price="lineItem.variant.price * lineItem.quantity"></sf-price>
                                </td>
                                <td>
                                    <button 
                                        @click="removeFromCart" 
                                        :value="lineItem.id"
                                        :data-id="lineItem.id"
                                    >
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </slot>

            <slot name="summary">
                <div class="cart__summary">
                    <div class="cart__summary--total">
                        Subtotal: <sf-price :price="subTotal"></sf-price>
                    </div>
                </div>
            </slot>

            <slot name="actions">
                <div class="cart__actions">
                    <a :href="checkout.webUrl" class="cart__actions--checkout" target="_blank">
                        Checkout
                    </a>
                </div>
            </slot>
        </div>

        <div v-else>
            <slot name="empty">
                <p>The cart is empty.</p>
            </slot>
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

        mounted() {
            if (this.lineItems.length) {
                console.log('lineItem', this.lineItems[0])
            }            
        },

        data() {
            return {
                lineItems: this.checkout.lineItems.edges.map(lineItem => lineItem.node),
                subTotal: this.checkout.subtotalPrice
            }
        },

        methods: {

            updateQuantity(e) {
                this.updateLineItems(e, Number(e.target.value));
            },

            removeFromCart(e) {
                this.updateLineItems(e, 0);
            },

            updateLineItems(event, quantity) {
                this.$apollo.mutate({
                    mutation: UPDATE_LINE_ITEMS,
                    variables: {
                        checkoutId: this.checkout.id,
                        lineItems: [{
                            id: event.target.dataset.id,
                            quantity
                        }]
                    },
                    update: (store, { data }) => {
                        this.lineItems = data.checkoutLineItemsUpdate.checkout.lineItems.edges.map(lineItem => lineItem.node);
                        this.subTotal = data.checkoutLineItemsUpdate.checkout.subtotalPrice;
                        this.$event.$emit('lineItemsCountUpdate', data.checkoutLineItemsUpdate.checkout.lineItems.edges.length)
                    }
                });
            }

        }
    }
</script>
