<template>
    <div class="product__tags">
        <a v-for="tag in tags" :href="`/tag/${tag.value.toLowerCase().replace(/ /i, '-')}`" >{{tag.value}}</a>
    </div>
</template>

<script>
    export default {
        props: {
            tags: {
                type: Array,
                required: true
            }
        }
    }
</script>
