<template>
    <sf-product-images :product="product" :mode="mode">
        <div class="product__images" slot-scope="{ images, selectedImage, updateActiveImage }">
            <div class="product__images--selected">
                <img :src="images[selectedImage].src" :alt="images[selectedImage].altText">
            </div>
            <div class="product__images--list" style="display: flex; align-items: center;">
                <a 
                    v-for="(image, index) in images"
                    @click.prevent="updateActiveImage" 
                    :data-index="index"
                    href="#0"
                >
                    <img 
                        :key="index"
                        :src="image.src" 
                        :alt="image.altText" 
                        :class="(index == selectedImage) ? 'active' : ''" 
                        style="display: block; max-width: 100px; border: 1px solid #ddd;" 
                    >
                </a>
            </div>
        </div>
    </sf-product-images>
</template>


<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            mode: {
                type: String,
                required: false
            }
        }
    }
</script>
