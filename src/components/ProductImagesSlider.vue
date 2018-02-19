<template>
    <sf-product-images :product="product" :mode="mode">
        <div class="product__images" slot-scope="{ images }">
            <div class="product__images--slider">
                <img 
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image.src" 
                    :alt="image.altText"
                >
            </div>
            <div class="product__images--navigation">
                <a @click.prevent="slider.prev()" href="#0">Left</a>
                <a @click.prevent="slider.next()" href="#0">Right</a>
            </div>
        </div>
    </sf-product-images>
</template>

<script>
    import Siema from 'siema';

    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            mode: {
                type: String,
                required: false
            },
            options: {
                type: Object,
                required: false
            }
        },

        data() {
            return {
                slider: false
            }
        },

        mounted() {
            let options;

            if (this.options) {
                options = this.options;
            } else {
                options = {
                    selector: '.product__images--slider'
                };
            }

            this.slider = new Siema(options);
        }
    }
</script>
