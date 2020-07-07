import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import store from './store'

let api = axios.create({
  baseURL: "http://localhost/dev/arcticaCI/public/index.php/"
});

api.interceptors.request.use(function(config){
  let token = store.getters.getToken;

  if(token !== null) {
    if(typeof config.data === "object") {
      config.data.token = token;
    }
    else {
      config.data = new FormData();
      config.data.append('token', token);
    }
  }
  return config;
}) ;

api.interceptors.response.use(function(response) {
  return response;
}, error => {
  if(error.response.status === 401) {
    Notify.create({
      icon: "warning",
      message: "Accès non autorisé",
      color: "negative"
    });
  }

  return Promise.reject(error);
});

Vue.use({
  install (Vue) {
    Vue.prototype.$api = api;
  }
});