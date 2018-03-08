<script>
    export default {
        props: {
            images: {
                type: Array,
                required: true
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
