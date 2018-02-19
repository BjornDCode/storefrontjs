<template>
    <div class="product__tabs">
        <nav class="product__tabs--navigation" role="tablist">
            <a 
                v-for="(tab, index) in tabs"
                :key="index"
                @click.prevent="setActiveTab"
                href="#0"
                role="tab"
                v-text="tab.title"
                :data-index="index"
            >
            </a>
        </nav>
        <div class="product__tabs--content">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: [],
                activeTab: 0
            }
        },

        created() {
            this.tabs = this.$children;
        },

        mounted() {
            this.updateTabs();
        },

        methods: {
            setActiveTab(e) {
                this.activeTab = e.currentTarget.dataset.index;
                this.updateTabs();
            },

            updateTabs() {
                this.tabs.forEach((tab, index) => {
                    tab.isActive = (index == this.activeTab)
                })
            }
        }
    }
</script>
