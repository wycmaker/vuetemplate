import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { UserManager } from '@/services/userDataManager';

// 登入處理
var manager = new UserManager();

export function routerProcess() {
  // 處理登入路由
  // 重新整理的話，sessionStorage還存在；分頁全部關閉後，sessionStorage會被刪除
  const alreadyExist = sessionStorage.getItem('alreadyExist');
  // 記錄開啟的分頁數量
  var count = parseInt(Cookies.get('pages'));

  // 完全關閉瀏覽器或關閉所有分頁時，都需清空localStorage的內容
  if(count < 1 && !alreadyExist || isNaN(count) && !alreadyExist) localStorage.clear();

  // 計算分頁數量
  if(isNaN(count)) Cookies.set('pages', 1, {samesite: 'lax'});
  else Cookies.set('pages', count+1, {samesite: 'lax'});

  // 重新整理狀態賦值
  if(!alreadyExist) sessionStorage.setItem('alreadyExist', '1');

  // 關閉分頁，分頁數量減1
  window.onunload = () => {
    var count = Cookies.get('pages');
    Cookies.set('pages', parseInt(count) - 1, {samesite: 'lax'});
  }

  setStore()

  window.addEventListener("storage", function (e) {
    var userInfo = localStorage.getItem('userInfo_template')
    if(userInfo === null) {
      var currentPath = this.window.location.hash.toLowerCase()
      if(currentPath !== '#/login') router.push('/login')
    } else {
      setStore()
      router.push('/').catch(()=>{})
    }
  })

  let setRoute = false

  /* 判斷是否有登入 */
  router.beforeEach((to, from, next) => {
    var userInfo = JSON.parse(localStorage.getItem('userInfo_template'))
    var path = to.path.toUpperCase()
    if(userInfo === null) {
      // 未登入
      if(path === '/LOGIN') next()
      else next({path: '/login'})
      setRoute = false
    } else {
      // 已登入

      if(path === '/LOGIN') {
        next({path: '/'})
      } 
      else {
        var index = router.routes.findIndex(r => r.path.toLowerCase() === to.path)
        if(index === -1) next({ path: '/' })
        else next()
      }

      // 依權限更新路由
      if(!setRoute) {
        // let targetRoute = []

        // if(userInfo !== null && userInfo.accountType !== 1) {
        //   let authority = userInfo.authority.split(',')
        //   let index = -1
        //   if(!authority.includes('1') && !authority.includes('2') && !authority.includes('3')) {
        //     index = routes.findIndex(r => r.path === '/ReportManage')
        //     targetRoute.push(routes[index])
        //   } 
        //   if(!authority.includes('4')) {
        //     index =  routes.findIndex(r => r.path === '/DoctorOrderFormula')
        //     targetRoute.push(routes[index])
        //   } 
        //   if(!authority.includes('5') && !authority.includes('6')) { 
        //     index = routes.findIndex(r => r.path === '/ImportQuery')
        //     targetRoute.push(routes[index])
        //   }
        //   if(!authority.includes('7')) {
        //     index = routes.findIndex(r => r.path === '/QuestionnaireList')
        //     targetRoute.push(routes[index])
        //   }
        //   if(!authority.includes('8')) {
        //     index = routes.findIndex(r => r.path === '/ChartExport')
        //     targetRoute.push(routes[index])
        //   }
        //   if(!authority.includes('9')) {
        //     index = routes.findIndex(r => r.path === '/UserManage')
        //     targetRoute.push(routes[index])
        //   }
        //   if(!authority.includes('10')) {
        //     index = routes.findIndex(r => r.path === '/GroupManage')
        //     targetRoute.push(routes[index])
        //   }
        //   if(!authority.includes('12')) {
        //     index = routes.findIndex(r => r.path === '/TemplateManage')
        //     targetRoute.push(routes[index])
        //   }
        // }

        // // 移除沒有權限的頁面
        // targetRoute.forEach(item => {
        //   router.removeRoute(item)
        // })

        setRoute = true
      }
    }
  })
}

/**
 * 設定使用者資訊
 */
function setStore() {
  const data = manager.getUserData()

  if (data) {
    store.commit('setUserInfo', data)

    const expiryDate = new Date(data.expiryDate)
    const now = new Date()

    if (now < expiryDate && data.token) {
      store.commit('authenticate')
    }
  }
}