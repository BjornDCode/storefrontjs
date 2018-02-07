<template>
    <div class="product-card">
        <sf-product-card-image :image="product.image"></sf-product-card-image>
        <div class="product-card__info">
            <sf-product-card-title :title="product.title"></sf-product-card-title>
            <sf-product-card-price :price="product.price"></sf-product-card-price>
            <sf-product-card-description :description="product.description"></sf-product-card-description>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        }
    }
</script>
