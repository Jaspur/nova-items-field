<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  resourceName: { type: String, default: '' },
  resourceId: { type: [String, Number], default: null },
  resource: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['input'])

const value = ref(props.field.value ?? '')
const maxReached = computed(() => props.field.maxReached ?? false)
const listFirst = computed(() => props.field.listFirst ?? false)
const fullWidth = computed(() => props.field.fullWidth ?? false)
const showHelpText = computed(() => props.field.showHelpText ?? true)

const updateValue = () => {
  emit('input', value.value)
}

watch(() => props.field.value, (newVal) => {
  value.value = newVal
})
</script>

<template>
  <default-field
    :field="field"
    :full-width-content="fullWidth"
    :show-help-text="showHelpText"
  >
    <template #field>
      <div class="nova-items-field">
        <div
          v-if="!(listFirst || maxReached)"
          class="nova-items-field-input-wrapper flex border border-40 p-4"
        >
          <input
            class="form-control form-input form-input-bordered w-full"
            type="text"
            v-model="value"
            @input="updateValue"
          />
        </div>
      </div>
    </template>
  </default-field>
</template>
