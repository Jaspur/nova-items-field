<template>
    <div>
        <span>{{ itemCount }}</span>
    </div>
</template>

<script>
export default {
    props: {
        resourceName: String,
        field: Object,
    },

    computed: {
        itemCount() {
            return Array.isArray(this.field.value) ? this.field.value.length : 0;
        }
    }
}
</script>
