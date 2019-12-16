import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' 
import { Datetime } from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.prototype.$screen = 0;
window.screen = 0;
window.customerID = null;
window.projectID = null;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
