import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './quasar'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
        baseURL: "http://localhost/dev/arcticaCI/public/index.php/",
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
