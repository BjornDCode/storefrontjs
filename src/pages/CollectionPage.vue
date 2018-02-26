<template>
    <div class="collection" v-if="collection">
        <div class="collection__image">
            <img :src="collection.image.src" :alt="collection.image.altText">
        </div>
        <div class="collection__info">
            <h1 class="collection__info--title">{{ collection.title }}</h1>
            <div class="collection__info--description">{{ collection.descriptionHtml }}</div>
        </div>
        <div class="collection__products">
            <h2>Products</h2>
            <sf-product-list :products="collection.products"></sf-product-list>
        </div>
    </div>
</template>


<script>
    export default {
        
        created() {
            this.getActiveCollection(this.$route.params.handle);
        },

        computed: {
            collection() {
                return this.$store.getters['collections/activeCollection'];
            }
        },

        methods: {
            getActiveCollection(handle) {
                this.$store.dispatch('collections/activeCollection', handle);
            }
        }

    }
</script>
