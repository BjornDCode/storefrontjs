<template>
    <div class="product-card__description">
        {{ description }}
    </div>
</template>

<script>
    export default {
        props: {
            description: {
                type: String,
                required: true
            }
        }
    }
</script>
