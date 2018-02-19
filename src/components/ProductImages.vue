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
        },

        computed: {
            images() {
                console.log(this.mode)
                if (this.mode == "variants") {
                    return this.product.variants.map(variant => variant.image);
                }

                return this.product.images;
            }
        },

        data() {
            return {
                selectedImage: 0
            }
        },

        methods: {
            updateActiveImage(e) {
                this.selectedImage = e.currentTarget.dataset.index;
            }
        },

        render() {
            return this.$scopedSlots.default({
                images: this.images,
                selectedImage: this.selectedImage,
                updateActiveImage: this.updateActiveImage
            });
        }
    }
</script>
