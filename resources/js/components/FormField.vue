<template>
  <default-field
    :field="field"
    :full-width-content="field.fullWidth"
    :show-help-text="showHelpText"
  >
    <template slot="field">
      <div class="nova-items-field">
        <div
          class="nova-items-field-input-wrapper flex border border-40 p-4"
          v-if="!field.listFirst && !maxReached"
        >
          <input
            v-model="newItem"
            :type="field.inputType"
            :placeholder="field.placeholder"
            autocomplete="new-password"
            @keydown.enter.prevent="addItem"
            class="flex-1 form-control form-input form-input-bordered"
          />
          <a
            @click="addItem"
            v-html="field.createButtonValue"
            v-if="!field.hideCreateButton"
            class="btn btn-default btn-primary ml-3 cursor-pointer font-sans"
          />
        </div>

        <ul
          v-if="items.length"
          ref="novaitemslist"
          :style="maxHeight"
          class="nova-items-field-input-items list-reset border border-40 py-2"
        >
          <draggable
            v-model="items"
            :options="{
              disabled: field.draggable === false,
              handle: '.sortable-handle',
            }"
          >
            <li
              v-for="(item, index) in items"
              :key="`${field.attribute}.${index}`"
              class="px-4 py-2"
            >
              <div class="nova-items-field-input-wrapper-item flex py-1">
                <span
                  v-if="field.draggable"
                  class="sortable-handle py-2 pl-0 pr-4 text-80 cursor-move"
                >
                  |||
                </span>
                <input
                  v-model="items[index]"
                  :type="field.inputType"
                  :name="`${field.name}[${index}]`"
                  autocomplete="new-password"
                  :class="{
                    'border-danger': hasErrors(`${field.attribute}.${index}`),
                  }"
                  class="flex-1 form-control form-input form-input-bordered"
                />
                <span
                  @click="removeItem(index)"
                  style="font-size: 32px"
                  class="ml-4 mr-2 font-thin cursor-pointer hover:font-normal"
                  v-html="field.deleteButtonValue"
                />
              </div>
              <div
                v-if="hasErrors(`${field.attribute}.${index}`)"
                class="help-text error-text -mt-2 text-danger py-2"
              >
                <p v-html="arrayErrors[`${field.attribute}.${index}`][0]" />
              </div>
            </li>
          </draggable>
        </ul>

        <div
          class="nova-items-field-input-wrapper flex border border-40 p-4"
          v-if="field.listFirst && !maxReached"
        >
          <input
            v-model="newItem"
            :type="field.inputType"
            :placeholder="field.placeholder"
            @keydown.enter.prevent="addItem"
            class="flex-1 form-control form-input form-input-bordered"
          />
          <a
            @click="addItem"
            v-html="field.createButtonValue"
            v-if="!field.hideCreateButton"
            class="btn btn-default btn-primary ml-3 cursor-pointer"
          />
        </div>
      </div>
    </template>
  </default-field>
</template>

<script>
import draggable from "vuedraggable";
import { FormField, HandlesValidationErrors } from "laravel-nova";

export default {
  mixins: [FormField, HandlesValidationErrors],

  components: { draggable },

  props: ["resourceName", "resourceId", "field"],

  data() {
    return {
      value: "",
      items: [],
      newItem: "",
      arrayErrors: {},
    };
  },

  mounted() {
    alert("HEY");
  },

  computed: {
    maxHeight() {
      return this.field.maxHeight === false
        ? ""
        : `max-height: ${this.field.maxHeight}px; overflow: auto;`;
    },
    maxReached() {
      return this.field.max !== false && this.items.length >= this.field.max;
    },
  },

  methods: {
    setInitialValue() {
      this.value = this.field.value || [];
      this.items = [...this.value];
    },

    fill(formData) {
      formData.append(this.field.attribute, JSON.stringify(this.items || []));
    },

    addItem() {
      const item = this.newItem.trim();
      if (item && !this.maxReached) {
        this.items.push(item);
        this.newItem = "";

        this.$nextTick(() => {
          if (this.field.maxHeight && this.$refs.novaitemslist) {
            this.$refs.novaitemslist.scrollTop =
              this.$refs.novaitemslist.scrollHeight;
          }
        });
      }
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },

    hasErrors(key) {
      return Object.prototype.hasOwnProperty.call(this.arrayErrors, key);
    },
  },

  watch: {
    items: {
      handler(newItems) {
        this.value = JSON.stringify(newItems);
      },
      deep: true,
    },
    errors: {
      handler(errors) {
        if (errors && errors.errors) {
          this.arrayErrors = errors.errors;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.sortable-chosen {
  border: 1px solid var(--50);
  background-color: var(--20);
  box-shadow: 2px 2px 2px var(--40);
  margin-left: -5px;
}
.sortable-handle {
  user-select: none;
  transform: rotate(90deg);
  position: relative;
  left: -5px;
  top: 5px;
}
</style>
