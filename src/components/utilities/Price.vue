<template>
    <span>
        {{ prefix }}<slot></slot>{{ suffix }}
    </span>
</template>

<script>
    export default {
        props: {
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
