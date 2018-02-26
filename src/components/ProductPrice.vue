<template>
    <div class="product__price">{{ prefix }}{{ price }}{{ suffix }}</div>
</template>

<script>
    export default {
        props: {
            price: {
                type: String,
                required: true
            },
            prefix: {
                type: String,
                required: false
            },
            suffix: {
                type: String,
                required: false
            }
        }
    }
</script>
