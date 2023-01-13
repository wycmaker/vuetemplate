<template>
  <el-select
    v-model="chooseValue" 
    reserve-keyword 
    filterable 
    placeholder=""
    :multiple="multiple"
    :clearable="clearable"
    :disabled="disabled"
    :filter-method="filterChange"
    :collapse-tags="collapseTags"
    v-select-loadmore="loadMore()" 
    @visible-change="visibleChange"
    @change="selectChange"
    @click.native="(e) => {
      e.preventDefault()
    }"
  >
    <el-option
      v-for="item in list" 
      :key="item.value"
      :label="customLabel !== '' ? item.label + customLabel : item.label"
      :value="useLabel ? (customLabel !== '' ? item.label + customLabel : item.label) : item.value"
    >
      <slot name="content" :item="item"></slot>
    </el-option>
  </el-select>
</template>
 
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => { return [] }
    },
    choose: {
      type: [ Array, Number, String, Boolean ]
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    'use-label': {
      type: Boolean,
      default: false
    },
    'custom-label': {
      type: String,
      default: ''
    },
    'collapse-tags': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      rangeNumber: 10,
      search: "",
      isShow: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCurrentList()
    })
  },
  methods: {
    /**
     * scrollBar下拉加載更多資料
     */
    loadMore() {
      return () => {
        this.rangeNumber += 5
        this.getCurrentList()
      }
    },
    /**
     * 下拉框出現/隱藏時觸發
     * @param {boolean} isShow 是否顯示
     */
    visibleChange(isShow) {
      this.isShow = isShow
      if(!isShow) {
        this.rangeNumber = 10
        this.search = ''
      }
      this.getCurrentList()
    },
    /**
     * 取得當前顯示的列表
     */
    getCurrentList() {
      let list = []
      // 展開下拉選單 => 顯示初始數據與選中對象
      if(this.search === '') list = [ ...this.stashList.slice(0, this.rangeNumber) ]
      else {
        list = [ ...this.stashList.filter(r => r.label.includes(this.search)).slice(0, this.rangeNumber) ]
      }

      if(this.chooseValue instanceof Array) {
        this.chooseValue.forEach(item => {
          const currentIndex = list.findIndex(r => r.value === item)
          const index = this.stashList.findIndex(r => r.value === item)
          if(currentIndex === -1 && index !== -1 && this.search === '') list.push(this.stashList[index])
        })
      }
      else {
        const currentIndex = list.findIndex(r => r.value === this.chooseValue)
        const index = this.stashList.findIndex(r => r.value === this.chooseValue)

        if(currentIndex === -1 && index !== -1 && this.search === '') list.push(this.stashList[index])
      }

      this.list = [ ...list ]
    },
    /**
     * 搜尋文字改變的函數
     * @param {string} searchText 搜尋文字
     */
    filterChange(searchText) {
      this.search = searchText
      this.rangeNumber = 10
      this.getCurrentList()
    },
    /**
     * 選項改變
     * @param {Number|Boolean} val 變更的數值
     */
    selectChange(val) {
      this.$emit('change', val)
    }
  },
  computed: {
    stashList: {
      get() {
        return [ ...this.dataList ]
      },
      set(newValue) {
        this.$emit('update:dataList', newValue)
      }
    },
    chooseValue: {
      get() {
        return this.choose
      },
      set(newValue) {
        this.$emit('update:choose', newValue)
      }
    }
  }
}
</script>
 
<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>