import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
const Header = () => import('@/layouts/Header')
const SideMenu = () => import('@/layouts/SideMenu')
/* Page */
/* ===========Main Page============= */
const Login = () => import('@/pages/Login')
const Index = () => import('@/pages/Index')

const url = process.env.FOLDER_PATH


/* 基礎路由 */
const baseRoutes = [
  {
    name: 'login',
    path: `${url}/Login`,
    component: Login
  },
  {
    name: 'home',
    path: url,
    components: {
      header: Header,
      sidemenu: SideMenu,
      default: Index
    }
  },
  {
    path: '*',
    redirect: url
  }
]

export let routes = [
]

class Router extends VueRouter {
  constructor(options) {
    super(options)
    const { addRoute } = this.matcher
    const { routes } = options
    this.routes = routes

    this.matcher.addRoute = (newRoute) => {
      this.routes.push(newRoute)
      addRoute(newRoute)
    }
  }

  removeRoute(route) {
    let index = this.routes.findIndex(r => r.path.toLowerCase() == route.path.toLowerCase())
    this.routes.splice(index, 1)
  }
}

Vue.use(Router)

// 解決路由導航報錯
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}


export const router = new Router({
  mode: 'history',
  routes: baseRoutes,
})
