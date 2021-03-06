// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
 
})
router.beforeEach((to, from, next) => {
  const loginPath = '/'
  if (to.path !== loginPath && !localStorage.getItem('mess')) {
    next(loginPath)
  } else {
    next()
  }
})
