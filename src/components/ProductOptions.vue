<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            variantIndex: {
                type: Number,
                required: true
            }
        },

        model: {
            prop: 'variantIndex',
            event: 'update'
        },

        computed: {
            options() {
                return this.product.options;
            },

            selectedOptions() {
                let selectedOptions = {};
                this.options.forEach((option) => {
                    selectedOptions[option.name] = option.values[0].value
                })
                return selectedOptions;
            }
        },

        methods: {
            updateOptions(e) {
                this.selectedOptions[e.currentTarget.name] = e.currentTarget.value;

                this.updateVariant();
            },

            updateVariant() {
                const selectedVariant = this.$client.product.helpers.variantForOptions(this.product, this.selectedOptions);

                const selectedVariantIndex = this.product.variants.findIndex(variant => variant.id == selectedVariant.id); 
                this.$emit('update', selectedVariantIndex);
            }
        },

        render() {
            return this.$scopedSlots.default({
                options: this.options,
                updateOptions: this.updateOptions
            })
        }
    }
</script>
