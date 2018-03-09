<template>
    <div class="product" itemscope itemtype="http://schema.org/Product">
        <slot name="image">
            <sf-product-images-slider 
                :images="images"
            ></sf-product-images-slider>
        </slot>
        <slot name="info">
            <div class="product__info">
                <h1 itemprop="name">{{ product.title }}</h1>
                <a itemprop="brand" :href="vendorUrl">{{ product.vendor }}</a>
                <sf-product-description :html="product.descriptionHtml"></sf-product-description>
            </div>
        </slot>
        <slot name="offer">          
            <div class="product__offer" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                <link 
                    itemprop="availability" 
                    :href="variant.availableForSale ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock'"
                >
                <sf-product-price :price="price" prefix="$" currency-code="USD"></sf-product-price>
                <div v-if="!variant.availableForSale" class="product__offer--available">Out of stock</div>
                <sf-product-options-radio :product="product" v-model="variantIndex"></sf-product-options-radio>
                <sf-product-actions :variant-id="variant.id"></sf-product-actions>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                variantIndex: 0
            }
        },

        mounted() {
            console.log(this.product.variants.edges.map(variant => variant.node))
        },

        computed: {
            variant() {
                return this.product.variants.edges[this.variantIndex].node;
            },
            price() {
                return this.variant.price;
            },
            images() {
                return this.product.images.edges.map(image => image.node)
            },
            vendorUrl() {
                return '/vendor/' + this.product.vendor.toLowerCase().replace(/\s+/g, '');
            }
        }
    }
</script>
