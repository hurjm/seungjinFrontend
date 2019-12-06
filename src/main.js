import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' 
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.$screen = 0
window.screen = 0;
window.customerID = null;
window.projectID = null;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
