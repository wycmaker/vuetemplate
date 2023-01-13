<template>
  <el-table 
   :data="list" 
   :border="border" 
   :stripe="stripe" 
   :class="classes" 
   :max-height="height"
   v-table-loadmore="loadMore()"
   class="loading"
   ref="scrollDom"
   v-loading="load"
   element-loading-background="#FFFFFF"
  >
    <slot name="data"></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    classes: {
      type: Array,
      default: () => { return [] }
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    height: {
      type: [ String, Number ],
      default: null
    },
    isInitial: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      startIndex: 0,
      totalHeight: 0,
      avarageHeight: 0,
      loadCount: 20,
      loadEnd: false,
      load: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.isInitial) this.initialList()
    })
  },
  methods: {
    /**
     * scrollBar下拉加載更多資料
     */
    loadMore() {
      if(this.height !== null) {
        return () => {
          // 計算當前卷軸位置
          this.getDisplayList()
        }
      }
      else return () => {}
    },
    /**
     * 初始化列表
     */
    initialList() {
      if(this.height !== null) {
        this.load = true
        this.$nextTick(_ => {
          const tableBody = this.$refs.scrollDom.$el.querySelector('.el-table__body')
          const width = tableBody.clientWidth
          let bodys = this.$refs.scrollDom.$el.querySelectorAll('.el-table__body')
          bodys.forEach(item => {
            item.style.position = 'relative'
            item.style['max-width'] = width + 'px'
          })
          tableBody.style.position = 'absolute'

          this.totalHeight = 0
          const vEle = document.createElement('div')
          vEle.style.width = this.totalHeight > this.height ? `${width - 9}px` : `${width}px`
          vEle.id = 'vEle'

          tableBody.childNodes.forEach(item => {
            item.style.width = this.totalHeight > this.height ? `${width - 9}px` : `${width}px`
          })

          const wapper = this.$refs.scrollDom.$el.querySelector('.el-table__body-wrapper')
          const target = wapper.querySelector('#vEle')
          if(target === null) wapper.appendChild(vEle)
          
          let i=0
          let step =  Math.ceil(this.stashList.length / 50)
          this.list = []
          while(i < step) {
            let start = i*50
            this.list = [ ...this.stashList.slice(start, start+50) ]
            this.$nextTick(_ => {
              const tableBody = this.$refs.scrollDom.$el.querySelector('.el-table__body')
              const height = tableBody.clientHeight
              this.totalHeight +=  height
            })
            i++
          }
          this.list = [ ...this.stashList.slice(0, 20) ]
          this.$nextTick(_ => {
            const vEle = document.querySelector('#vEle')
            vEle.style.height = this.totalHeight + 'px'
            this.avarageHeight = this.totalHeight / this.stashList.length
            this.load = false
          })
        })
      }
      else {
        this.getCurrentList()
      }
    },
    /**
     * 取得當前表格顯示的資料
     */
    getCurrentList() {
      this.list = [ ...this.stashList ]
    },
    /**
     * 取得表格顯示資料(完成載入後)
     */
    getDisplayList() {
      const wapper = this.$refs.scrollDom.$el.querySelector('.el-table__body-wrapper')
      if(this.totalHeight - wapper.scrollTop > this.height) {
        this.startIndex = Math.floor(wapper.scrollTop / this.avarageHeight)
        this.list = [ ...this.stashList.slice(this.startIndex, this.startIndex + this.limitCount) ]
        const tableBody = this.$refs.scrollDom.$el.querySelectorAll('.el-table__body')
        tableBody.forEach(item => {
          item.style.top = this.top + 'px'
        })
      }
    }
  },
  computed: {
    stashList: {
      get() {
        return this.data
      },
      set(newValue) {
        this.$emit('update:data', newValue)
      }
    },
    limitCount() {
      return this.height === null || this.avarageHeight === 0 ? 15 : Math.floor(this.height/this.avarageHeight) + 10;
    },
    addCount() {
      return Math.floor(this.height/this.avarageHeight)
    },
    top() {
      return this.startIndex * this.avarageHeight;
    },
  },
  watch: {
    'data.length': function() {
      setTimeout(_ => {
        if(this.currentLoad !== 0) {
          const el = this.$el.querySelector('.el-table__body-wrapper')
          this.initialList()
          el.scrollTop = 1
        }
      }, 1)
    },
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>