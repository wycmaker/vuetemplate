import vue from 'vue'
import toastComponent from '@/plugins/toastr/Toastr.vue';

const ToastConstructor = vue.extend(toastComponent)

function showToast({
  text,
  type = 'info',
  duration = 1000,
  position = 'bottom-center'
}) {
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
      var elements = document.getElementsByClassName('app-toast');

      for(let i=0;i<elements.length;i++) {
        let index = elements.length - i;
        var target = elements[i];

        if(target.classList[2].includes('bottom')) {
          target.style.bottom = (30 + index * 70) + 'px';
        } else {
          target.style.top = (30 + index * 70) + 'px';
        }
        
      }
    }
  })

  document.body.appendChild(toastDom.$el)
  let execute = 0;

  var calculate = setInterval(() => {

    execute++;

    toastDom.$el.getElementsByClassName('progress')[0].style.width = (100 - execute) + '%';
  }, duration/100);

  setTimeout(() => {
    document.body.removeChild(toastDom.$el)
    clearInterval(calculate)
  }, duration)
}

function registryToast() {
  vue.prototype.$toast = showToast
}

export default registryToast
