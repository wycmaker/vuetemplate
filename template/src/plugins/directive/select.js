import Vue from "vue"
Vue.directive(
  'select-loadmore', {
    bind(el, binding) {
      const select = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      select.addEventListener('scroll', function () {
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (condition) binding.value()
      });
    }
  }
)