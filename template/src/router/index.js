import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

/* Layout */
import Header from '@/layouts/Header'
import SideMenu from '@/layouts/SideMenu'
/* Page */
/* ===========Main Page============= */
import Login from '@/pages/Login'
import Index from '@/pages/Index'


/* 基礎路由 */
let baseRoutes = [
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
    path: '/usermanage',
    components: {
      header: Header,
      sidemenu: SideMenu,
      default: Index
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

class VueRouterEx extends VueRouter {
  constructor(options) {
    super(options)
    const { addRoute } = this.matcher
    const { routes } = options
    this.routes = routes

    this.matcher.addRoute = (newRoute) => {
      this.routes.push(newRoute)
      addRoute(newRoute)
    };
  }

  removeRoute(route) {
    let index = this.routes.findIndex(r => r.path.toLowerCase() == route.path.toLowerCase())
    this.routes.splice(index, 1)
  }
}

Vue.use(VueRouterEx)

// 解決路由導航報錯
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}


export default new VueRouterEx({
  mode: 'hash',
  routes: baseRoutes,
})
