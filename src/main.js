import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import　"./plugins/element.js"
import './assets/css/reset.css'
import api from "./api/index.js"
Vue.prototype.$api = api;
// import { Button, Select } from 'element-ui';
Vue.config.productionTip = false
// Vue.use({Button, Select});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
