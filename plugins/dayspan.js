import Vue from 'vue'
const components = require('vue-feather-icons')

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
