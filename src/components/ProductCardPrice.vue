<template>
    <div class="product-card__price">
        {{ price }}
    </div>
</template>

<script>
    export default {
        props: {
            price: {
                type: String,
                required: true
            }
        }
    }
</script>
