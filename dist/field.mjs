Nova.booting((e, o, t) => {
  e.component(
    "index-nova-items-field",
    require("./components/IndexField.vue").default
  ), e.component(
    "detail-nova-items-field",
    require("./components/DetailField.vue").default
  ), e.component(
    "form-nova-items-field",
    require("./components/FormField.vue").default
  ), e.component(
    "detail-nova-items-field-item",
    require("./components/DetailFieldItem.vue").default
  );
});
