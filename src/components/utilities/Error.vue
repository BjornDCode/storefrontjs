<template>
    <div>
        <slot :error="error">
            <div class="error">{{ error.message }}</div>   
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            error: {
                type: Object,
                required: true
            }
        }
    }
</script>
