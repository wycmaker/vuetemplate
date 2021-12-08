import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Header from '@/layouts/Header'
import SideMenu from '@/layouts/SideMenu'
/* Page */
/* ===========Main Page============= */
import Login from '@/pages/Login'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/',
      components: {
        header: Header,
        sidemenu: SideMenu,
        default: Index
      }
    },
    {
      path: '*',
      components: {
        header: Header,
        sidemenu: SideMenu,
        default: NotFound
      }
    }
  ]
})
