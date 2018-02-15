<template>
    <div class="product" v-if="product">
        <div class="product__image">
            <img :src="image.src" :alt="image.altText">
        </div>
        <div class="product__info">
            <h1>{{ product.title }}</h1>
            <p>{{ product.vendor }}</p>
            <div class="product__price">{{ price }}</div>
            <div class="product__description" v-html="product.descriptionHtml"></div>
            <div class="product__options">
                <div v-for="option in options" class="option">
                    <label>{{ option.name }}</label>
                    <span v-if="option.values.length === 1">
                        {{ option.selected }}
                    </span>
                    <select v-else @change="updateOptions" :name="option.name">
                        <option v-for="value in option.values" :value="value.value">
                            {{ value.value }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        // 1. Declare empty options array on data
        // 2. Watch this.product and update options with new options.objects
        // 3. <Select @change> updates this.options
        // 4. Watch options and update variant

        props: {
            product: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                variant: 0            
            }
        },

        computed: {
            image() {
                return this.product.images[0];
            },

            price() {
                return this.product.variants[this.variant].price;
            },

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

                this.variant = this.product.variants.findIndex(variantOption => {
                    return variantOption.id == variant.id
                });
            }
        }
    }
</script>
