<template>
    <div class="product__price">
        <meta itemprop="priceCurrency" :content="currencyCode">
        {{ prefix }}<span itemprop="price">{{ price }}</span>{{ suffix }}
    </div>
</template>

<script>
    export default {
        props: {
            price: {
                type: String,
                required: true
            },
            prefix: {
                type: String,
                required: false
            },
            suffix: {
                type: String,
                required: false
            },
            currencyCode: {
                type: String,
                required: true
            }
        }
    }
</script>
