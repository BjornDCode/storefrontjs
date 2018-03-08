<template>
    <sf-product-images :images="images">
        <div class="product__images" slot-scope="{ images, selectedImage, updateActiveImage }">
            <div class="product__images--slider">
                <img 
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image.src" 
                    :alt="image.altText"
                    :itemprop="index == 0 ? 'image' : ''"
                >
            </div>
            <slot name="navigation" :slider="slider">
                <div class="product__images--navigation">
                    <a 
                        href="#"
                        v-for="(image, index) in images"
                        :key="index"
                        @click.prevent="slider.goTo(index)"
                    >
                        <img :src="image.src" :alt="image.altText">
                    </a>

                </div>
            </slot>
        </div>
    </sf-product-images>
</template>


<script>
    import Siema from 'siema';

    export default {
        props: {
            images: {
                type: Array,
                required: true
            },
            options: {
                type: Object,
                required: false
            }
        },

        data() {
            return {
                slider: undefined
            }
        },

        mounted() {
            let options;

            if (this.options) {
                options = this.options
            } else {
                options = {
                    selector: '.product__images--slider'
                }
            }

            this.slider = new Siema(options);
        }
    }
</script>
