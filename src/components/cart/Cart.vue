<template>
    <div class="cart">
        <slot name="header"></slot>

        <div v-if="error">
            <slot name="error">
                <sf-error :error="{ message: 'Sorry, something went wrong' }"></sf-error>
            </slot>
        </div>
    
        <div v-if="completed">
            <slot name="completed">
                <p>Thank you for your purchase</p>
            </slot>
        </div>

        <div v-else-if="lineItems.length">
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
                                        v-if="lineItem.variant.image"
                                        :src="lineItem.variant.image.src"
                                        :alt="lineItem.variant.image.altText"
                                    >
                                    <img 
                                        v-else
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
                                        :disabled="updatingCart"
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
                                        :disabled="updatingCart"
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
                    <button 
                        @click="checkoutStart" 
                        :disabled="updatingCart"
                    >
                        Checkout
                    </button>
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
    import { GET_CHECKOUT } from '../../graphql/queries';
    import { UPDATE_LINE_ITEMS, CREATE_CHECKOUT, UPDATE_CHECKOUT_ID } from '../../graphql/mutations';

    export default {

        props: {
            checkout: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                lineItems: this.checkout.lineItems.edges.map(lineItem => lineItem.node),
                subTotal: this.checkout.subtotalPrice,
                updatingCart: false,
                externalCheckoutActive: false,
                completed: false,
                error: undefined
            }
        },

        apollo: {
            completed: {
                query: GET_CHECKOUT,
                variables() {
                    return {
                        id: this.checkout.id
                    }
                },
                update: data => Boolean(data.node.completedAt),
                error: error => this.error = error,
                fetchPolicy: 'network-only',
                pollInterval: 1000,
                skip() {
                    return !this.externalCheckoutActive || this.completed;
                }
            }
        },

        watch: {
            completed: function(newStatus, oldStatus) {
                this.createCheckoutMutation();
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
                this.updatingCart = true;
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
                })
                .then(data => {
                    this.updatingCart = false;
                })
                .catch(error => {
                    this.error = error
                });
            },

            checkoutStart() {
                this.externalCheckoutActive = true;
                window.open(this.checkout.webUrl);
            },

            createCheckoutMutation() {
                this.$apollo.mutate({
                    mutation: CREATE_CHECKOUT,
                    update: (store, { data }) => {
                        this.setLocalCheckoutID(data.checkoutCreate.checkout.id);
                        this.$event.$emit('newCheckout', data.checkoutCreate.checkout.id)
                        this.$event.$emit('lineItemsCountUpdate', 0)
                    }
                })
                .catch(error => {
                    this.error = error
                });;
            },
            setLocalCheckoutID(id) {
                this.$apollo.mutate({
                    mutation: UPDATE_CHECKOUT_ID,
                    variables: {
                        id
                    }
                })
            }

        }
    }
</script>
