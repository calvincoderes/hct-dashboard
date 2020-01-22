import Vue from 'vue'
import 'fullcalendar/dist/fullcalendar.css'

const components = require('vue-full-calendar')

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
