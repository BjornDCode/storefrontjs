<template>
    <sf-cart v-if="checkout" :checkout="checkout"></sf-cart>
</template>

<script>
    import { GET_CHECKOUT_ID, UPDATE_CHECKOUT_ID, GET_CHECKOUT, CREATE_CHECKOUT } from '../queries';

    export default {
        data() {
            return {
                checkoutId: false,
                checkout: false
            }
        },

        apollo: {
            checkoutId: {
                query: GET_CHECKOUT_ID,
                update: function(data) {
                    if (!data.checkoutID.id) {
                        this.createCheckoutMutation();
                        return;
                    }

                    return data.checkoutID.id;                    
                }
            },
            checkout: {
                query: GET_CHECKOUT,
                update: function(data) {
                    return data.node;
                },
                variables() {
                    return {
                        id: this.checkoutId
                    }     
                },
                skip() {
                    return this.checkout || !this.checkoutId;
                }
            }
        },

        methods: {
            createCheckoutMutation() {
                this.$apollo.mutate({
                    mutation: CREATE_CHECKOUT,
                    update: (store, { data }) => {
                        this.checkout = data.checkoutCreate.checkout;
                        this.checkoutId = data.checkoutCreate.checkout.id;
                        this.setLocalCheckoutID(data.checkoutCreate.checkout.id);
                    }
                });
            },
            setLocalCheckoutID(id) {
                this.$apollo.mutate({
                    mutation: UPDATE_CHECKOUT_ID,
                    variables: {
                        id
                    },
                })
            }
        }
    }
</script>
