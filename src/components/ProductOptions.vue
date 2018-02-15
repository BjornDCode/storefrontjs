<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            variant: {
                type: Number,
                required: true
            }
        },

        model: {
            prop: 'variant',
            event: 'update'
        },

        computed: {
            options() {
                return this.product.options.map(option => {
                    return {
                        name: option.name,
                        values: option.values,
                        selected: option.values[0].value
                    }
                });
            }
        },

        methods: {
            updateOptions(e) {
                const obj = this.options.find(option => option.name === e.target.name);
                const objIndex = this.options.findIndex(option => option.name === e.target.name);

                this.options.splice(objIndex, 1, Object.assign(obj, { selected: e.target.value }));

                this.updateVariant();
            },

            updateVariant() {
                let variant = this.product.variants.filter(variant => {
                    const filteredOptions = this.options.filter((option, index) => {
                        return variant.selectedOptions[index].value == option.selected

                    });
                    return filteredOptions.length == this.options.length;
                })[0];


                let newVariant = this.product.variants.findIndex(variantOption => {
                    return variantOption.id == variant.id
                });
                this.$emit('update', newVariant);
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
