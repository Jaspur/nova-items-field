<template>
    <div class="flex border-b border-40">
        <div class="w-1/4 py-4">
            <h4 class="font-normal text-80">
                {{ field.name }}
            </h4>
        </div>
        <div class="w-3/4 pt-4">
            <component
                v-if="isValidComponent"
                v-for="(item, index) in field.value"
                :key="index"
                :is="field.detailItemComponent"
                :item="item"
                v-bind="$props"
            />
            <div v-else class="text-danger">
                Component <strong>{{ field.detailItemComponent }}</strong> niet gevonden.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],

    computed: {
        isValidComponent() {
            return !!this.$options.components?.[this.field.detailItemComponent];
        }
    }
}
</script>
