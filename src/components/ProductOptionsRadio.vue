<template>
    <sf-product-options 
        :product="product" 
        :variant="variant"
        @update="variant => { $emit('update', variant) }"
    >
        <div class="product__options" slot-scope="{ options, updateOptions }">
            <div v-for="option in options" class="option">
                <label>{{ option.name }}</label>
                <span v-if="option.values.length === 1">
                    {{ option.selected }}
                </span>
                <div v-else>
                    <div v-for="value in option.values" >
                        <label>{{ value.value }}</label>
                        <input 
                            type="radio" 
                            :name="option.name" 
                            :value="value.value"
                            @change="updateOptions"
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
