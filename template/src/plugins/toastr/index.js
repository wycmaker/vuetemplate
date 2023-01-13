import vue from 'vue'
import toastComponent from '@/plugins/toastr/Toastr.vue';

const ToastConstructor = vue.extend(toastComponent)

export const CustomToastr = ({ text, type = 'info', duration = 1000, position = 'bottom-center'}) => {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        isShow: true,
        text: text,
        type: type,
        position: position
      }
    },
    mounted() {
      var elements = document.getElementsByClassName('custom-toast')

      // 計算toastr區塊的位置
      let height = 0
      for(let i=elements.length - 1; i>=0; i--) {
        let target = elements[i]
        height += target.clientHeight + 10
        if(elements[0].classList[2].includes('bottom')) {
          target.style.bottom = (height) + 'px'
        }
        else {
          target.style.top = (50 + height) + 'px'
        }
      }
    }
  })

  document.body.appendChild(toastDom.$el)
  let execute = 0

  // 處理進度條顯示
  var calculate = setInterval(() => {
    execute++
    toastDom.$el.getElementsByClassName('progress')[0].style.width = (100 - execute) + '%'
  }, duration/100)

  //清除Toastr區塊
  setTimeout(() => {
    document.body.removeChild(toastDom.$el)
    clearInterval(calculate)
  }, duration)
}


