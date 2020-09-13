import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './quasar'
import './ajax'
import texts from './texts'
import store from './store'


Vue.config.productionTip = false

Vue.use(texts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
