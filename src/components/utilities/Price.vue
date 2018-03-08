<template>
    <span>
        {{ prefix }}{{ price }}{{ suffix }}
    </span>
</template>

<script>
    export default {
        props: {
            price: {
                type: [String, Number],
                required: true
            },
            prefix: {
                type: String,
                required: false,
                default: '$'
            },
            suffix: {
                type: String,
                required: false
            }
        }
    }
</script>
