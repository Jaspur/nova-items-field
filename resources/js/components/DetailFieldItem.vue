<template>
    <p class="pb-4" v-if="item !== null && item !== undefined">
        {{ item }}
    </p>
    <p class="pb-4 text-80 italic" v-else>
        Geen waarde opgegeven
    </p>
</template>

<script>
export default {
    props: {
        item: {
            type: [String, Number, Object],
            default: null,
        },
        resource: Object,
        field: Object,
    }
}
</script>
