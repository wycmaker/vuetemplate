// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import { routerProcess } from '@/services/routerProcess.js'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import '@/services/browserJudge.js'
window.toastr = require('toastr');

Vue.use(ElementUI)
Vue.use(VueToastr2)
locale.use(lang)


Vue.config.productionTip = false
Vue.config.devtools =  (process.env.NODE_ENV === 'dev')

// 登入判斷與路由
routerProcess();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
