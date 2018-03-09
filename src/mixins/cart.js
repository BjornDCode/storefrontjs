import { GET_CHECKOUT } from '../graphql/queries';
import { CREATE_CHECKOUT } from '../graphql/mutations';


export default {
    data() {
        return {
            checkoutId: localStorage.getItem('checkoutID'),
            checkout: false,
            lineItemsCount: 0
        }
    },

    mounted() {
        this.$event.$on('lineItemsCountUpdate', count => this.lineItemsCount = count);
        this.$event.$on('newCheckout', id => this.checkoutId = id)

        if (!this.checkoutId) {
            this.createCheckoutMutation();
        }
    },

    apollo: {
        checkout: {
            query: GET_CHECKOUT,
            update: function(data) {
                this.lineItemsCount = data.node.lineItems.edges.length;
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
                    localStorage.setItem('checkoutID', data.checkoutCreate.checkout.id)
                    this.checkout = data.checkoutCreate.checkout;
                }
            });
        }
    }
}
