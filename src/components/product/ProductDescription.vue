<template>
    <div class="product__description" itemprop="description">
        <slot name="header"></slot>
        <slot>
            <div v-html="html"></div>
        </slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
    export default {
        props: {
            html: {
                type: String,
                required: true
            }
        }
    }
</script>
