<template>
    <div class="product-card__image-container">
        <img :src="image.src" :alt="image.altText">
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: Object,
                required: true
            }
        }
    }
</script>
