<template>
    <sf-product-options 
        :product="product" 
        :variantIndex="variantIndex" 
        @update="variantIndex => { $emit('update', variantIndex) }"
    >
        <div class="product__options" slot-scope="{ options, updateOptions }">
            <div class="option" v-for="option in options">
                <label>{{ option.name }}</label>
                <span v-if="option.values.length === 1">
                    {{ option.values[0].value }}
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
            variantIndex: {
                type: Number,
                required: true
            }
        },
        model: {
            prop: 'variantIndex',
            event: 'update'
        }
    }
</script>
