import axios from 'axios';
import Vue from 'vue';
import store from '@/store'

axios.defaults.baseURL = process.env.API_ROOT;

axios.interceptors.request.use((config) => {
  if (!config.headers.Authorization && store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }

  if (!config.timeout) {
    config.timeout = 60000
  }

  return config;
});

axios.interceptors.response.use(response => {
  if (response.status && response.status == 200 && response.data.status == 'error') {
    return;
  }
  return response;
}, error => {
  const response = error.response;
  error.globalErrorProcess = () => {
    
    if (response) {
      if (response.status === 401) {
        store.commit('clearUserInfo')
        Vue.prototype.$toast({
          text: '您的授權已過期，請重新登入!!',
          type: 'danger',
          duration: 1000
        })
        location.hash = '#/login';
      }
    }
    return Promise.resolve(error);
  };

  if(error.config.hasOwnProperty('catch') && error.config.catch == true) {
    return Promise.reject(error);
  }

  return error.globalErrorProcess();
});

export class ApiService {
  /**
   * 送出Get的API
   * @param {String} url API網址
   * @param {Object} params Get參數
   */
  getData(url, params) {
    return axios({
      method: 'GET',
      url: url,
      params: params,
      headers: { Pragma: 'no-cache' }
    })
  }

  /**
   * 送出Post的API
   * @param {String} url API網址
   * @param {Object} data Post資料
   */
  postData(url, data) {
    return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: { Pragma: 'no-cache' }
    });
  }

  /**
   * 送出Post的API(form-data)
   * @param {String} url API網址
   * @param {Object} data Post資料(formData)
   */
  postFormData(url, data) {
    return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: { Pragma: 'no-cache' },
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    });
  }
}