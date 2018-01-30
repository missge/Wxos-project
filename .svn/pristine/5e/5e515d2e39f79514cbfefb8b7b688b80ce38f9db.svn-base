// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import MintUI from 'mint-ui';
Vue.config.productionTip = false
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
Vue.use(Vuex)
Vue.use(MintUI)
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
