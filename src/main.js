// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import vueresource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import store from './store'



Vue.config.productionTip = false

Vue.use(vueresource);


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})