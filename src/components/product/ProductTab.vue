<template>
    <section 
        class="product__tab"
        role="tabpanel"
        v-if="isActive"
    >
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
    </section>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                isActive: false
            }
        }
    }
</script>
