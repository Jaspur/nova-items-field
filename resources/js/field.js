Nova.booting((Vue, router, store) => {
  Vue.component(
    "index-nova-items-field",
    require("./components/IndexField.vue").default
  );
  Vue.component(
    "detail-nova-items-field",
    require("./components/DetailField.vue").default
  );
  Vue.component(
    "form-nova-items-field",
    require("./components/FormField.vue").default
  );
  Vue.component(
    "detail-nova-items-field-item",
    require("./components/DetailFieldItem.vue").default
  );
});
