import Vue from "vue"
Vue.directive(
  'table-loadmore', {
    bind(el, binding) {
      const wapper = el.querySelector('.el-table__body-wrapper');
      wapper.addEventListener('scroll', function () {
        binding.value()
      })
    }
  }
)
