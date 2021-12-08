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

  const data = manager.getUserData()

  if (data) {
    store.commit('setUserInfo', data);

    const expiryDate = new Date(data.expiryDate)
    const now = new Date()

    if (now < expiryDate && data.token) {
      store.commit('authenticate')
    }
  }

  /* 判斷是否有登入 */
  router.beforeEach((to, from, next) => {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var path = to.path.toUpperCase();
    if(userInfo === null) {
      // 未登入
      if(path === '/LOGIN') next();
      else next({path: '/Login'});
    } else {
      // 已登入
      if(path === '/LOGIN') next('/');
      else next();
    }
  })
}