import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// import VueResource from 'vue-resource'
// import './vue.config.js';
Vue.prototype.$http = axios;
axios.defaults.baseURL='/api';
// console.log(window.sessionStorage);
const key = window.sessionStorage.token;
if (key) {
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
}

// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   console.log(response);
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
Vue.config.productionTip = false;
// Vue.use(VueResource);
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
