Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-items-field', require('./components/IndexField').default)
Vue.component('detail-nova-items-field', require('./components/DetailField').default)
Vue.component('form-nova-items-field', require('./components/FormField').default)
Vue.component('detail-nova-items-field-item', require('./components/DetailFieldItem').default)

})
