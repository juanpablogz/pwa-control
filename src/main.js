import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/tailwind.css'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
