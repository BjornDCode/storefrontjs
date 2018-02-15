<template>
    <sf-product-options :product="product" :variant="variant" @update="variant => { $emit('update', variant) }">
        <div class="product__options" slot-scope="{ options, updateOptions }">
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
    </sf-product-options>
</template>


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
        }
    }
</script>
