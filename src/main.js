import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from './store.js';

const fb = require('./firebaseConfig.js')

import "./assets/css/_global.scss";

let app
fb.auth.onAuthStateChanged(user => {
  console.log('user from main.js: ', user);
  store.dispatch('setCurrentUser', user);
  store.dispatch('patchUid', user.uid).then(() =>   fb.functions.initialFetch())
  store.dispatch('fetchUserProfile');
  router.push('/project');
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  fb,
  render: h => h(App)
}).$mount("#app");
