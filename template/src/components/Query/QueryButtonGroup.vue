<template>
  <div :class="[$style['query-item']]">
    <el-button :class="[$style['btn-B'], $style.radius]" icon="el-icon-search" v-if="show[0]" @click="getList"> 搜尋</el-button>
    <el-button :class="[$style['btn-A'], $style.radius]" icon="el-icon-document-add" v-if="show[1]" @click="createData"> 新增</el-button>
    <el-button :class="[$style['btn-B'], $style.radius]" v-if="show[2]" @click="exportList" >匯　出</el-button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Array,
      default: () => {
        return [true, true, false]
      }
    }
  },
  methods: {
    /**
     * 匯出資料
     */
    exportList() {
      this.$emit('export')
    },
    /**
     * 新增資料
     */
    createData() {
      this.$emit('add', null)
    },
    /**
     * 取得列表資料
     */
    getList() {
      this.$emit('getData', false)
    }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';

  .radius {
    border-radius: 36px !important;
    font-size: $font-size-1 !important;
    font-weight: $font-weight-1 !important;
  }

  .query-item {
    :global {
      @include button-padding-setting(9px 19px !important);
    }
    
  }
</style>
