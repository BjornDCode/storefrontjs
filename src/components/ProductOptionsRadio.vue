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
                <div v-else>
                    <div v-for="(value, index) in option.values">
                        <label>{{ value.value }}</label>
                        <input 
                            type="radio"
                            :name="option.name"
                            :value="value.value"
                            @change="updateOptions"
                            :checked="index == variantIndex"
                        >
                    </div>
                </div>
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
