import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

let api = axios.create({
  baseURL: "http://localhost/dev/arcticaCI/public/index.php/",
});

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