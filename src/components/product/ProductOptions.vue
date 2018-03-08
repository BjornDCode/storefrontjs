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
                    selectedOptions[option.name] = option.values[0]
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
                const selectedVariant = this.product.variants.edges.find(variant => {
                    return variant.node.selectedOptions.every(selectedOption => {
                        return this.selectedOptions[selectedOption.name] === selectedOption.value;
                    })
                })
                
                const selectedVariantIndex = this.product.variants.edges.findIndex(variant => variant.node.id === selectedVariant.node.id)

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
