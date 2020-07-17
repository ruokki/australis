import Vue from 'vue'
import $ from 'jquery';
// import { Notify } from 'quasar'
import store from './store'

let ajax = new class {

  constructor() {
      this.clear();
  }

  // Initialisation de la configuration
  clear() {
      this.config = {
          type: 'POST',
          dataType: 'JSON'
      };
      this.opts = {
          before: [],
          success: [],
          complete: [],
          error: []
      };
  }

  // URL cible
  // Si aucun paramètre HTTP, utilise la fonction globale << siteUrl >> comme préfix
  // Défini << errorName >> par le dernier paramètre de l'URL
  url(url) {
      if(!/^http(s)?:\/\/.*/.test(url)) {
          url = "http://localhost/dev/arcticaCI/public/index.php/" + url;
      }
      this.config.url = url;
      if(typeof(this.config.errorName) === "undefined") {
          this.config.errorName = url.split('/').pop();
      }
      return this;
  }

  // Supprime la paramètre << dataType: 'JSON' >> configuré par défaut
  noDataType() {
      delete this.config.dataType;
      return this;
  }

  // Défini le format du retour
  json() {
      this.config.dataType = 'JSON';
      return this;
  }

  // Nom de l'erreur retournée par le globalHandler
  errorName(name) {
      this.config.errorName = name;
      return this;
  }

  // Texte affiché pendant l'exécution de la requête
  //   {texte} => texte affiché
  //   {hide} => alerte cachée à la fin de l'exécution (dans le cas où on enchaine les requêtes AJAX sans forcément la cacher)
  wait(texte, hide = true) {
      this.opts.wait = {
          message: texte,
          hide: hide
      };
      return this;
  }

  formData() {
    this.config.contentType = false;
    this.config.processData = false;
    return this;
  }

  // Cache l'alerte à la fin de l'exécution (utile uniquement si le paramètre << wait >> n'est pas défini)
  hideWait() {
      this.opts.wait = {hide: true};
      return this;
  }

  // Requête de type GET
  get() {
      this.config.type = 'GET';
      return this;
  }

  // Ajoute un handler sur le beforeSend
  beforeSend(func) {
      this.opts.before.push(func);
      return this;
  }

  // Ajoute un handler sur le success
  success(func) {
      this.opts.success.push(func);
      return this;
  }

  // Ajoute un handler sur le error
  error(func) {
      this.opts.error.push(func);
      return this;
  }

  // Ajoute un handler sur le complete
  complete(func) {
      this.opts.complete.push(func);
      return this;
  }

  // Modifie le timeout de la requête
  timeout(time) {
      this.config.timeout = time;
      return this;
  }

  // Affiche l'erreur dans la console et non une alerte
  consoleError() {
      this.config.showErrorInConsole = true;
      return this;
  }

  // Envoi du XHR
  send(data) {
      // Variable local contenant la configuration
      let currentXHR = {
          config: this.config,
          opts: this.opts
      };
      let token = store.getters.getToken;
      // On va rajouter le token
      if(token !== null) {
        // On est sur un formData
        if(currentXHR.config.contentType === false) {
          data.append("token", token);
        }
        // Pas d'envoi de data
        else if(data === undefined) {
          data = { token: token };
        }
        // On est sur du JSON
        else {
          data['token'] = token;
        }
      }

      // Gestion de la notif de chargement
      if(currentXHR.opts.wait) {
          if(currentXHR.opts.wait.message) {
              // currentXHR.opts.before.push(() => { showAlertBox('loading', currentXHR.opts.wait.message); });
          }
          if(currentXHR.opts.wait.hide) {
              // currentXHR.opts.complete.push(() => { hideAlertBox('loadingBox'); });
          }
      }

      if(currentXHR.opts.before.length > 0) {
          currentXHR.config.beforeSend = function() {
              for(var i in currentXHR.opts.before) {
                  currentXHR.opts.before[i]();
              }
          };
      }

      if(currentXHR.opts.success.length > 0) {
          currentXHR.config.success = function(data) {
              for(var i in currentXHR.opts.success) {
                currentXHR.opts.success[i](data);
              }
          };
      }

      if(currentXHR.opts.error.length > 0) {
          currentXHR.config.error = function() {
              for(var i in currentXHR.opts.error) {
                  currentXHR.opts.error[i]();
              }
          };
      }

      currentXHR.config.complete = function() {
          if(currentXHR.opts.complete.length > 0) {
              for(var i in currentXHR.opts.complete) {
                  currentXHR.opts.complete[i]();
              }
          }
      };

      if(typeof data !== "undefined") {
          currentXHR.config.data = data;
      }

      this.clear();
      $.ajax(currentXHR.config);
  }
};

Vue.use({
  install (Vue) {
    Vue.prototype.$api = ajax;
  }
});