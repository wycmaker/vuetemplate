<template>
  <div :class="[$style['query-item']]">
    <el-button :class="$style['btn-B']" icon="el-icon-search" v-if="show[0]" @click="getList"></el-button>
    <el-button :class="$style['btn-B']" icon="el-icon-document-add" v-if="show[1]" @click="createData">新增</el-button>
    <el-button :class="$style['btn-B']" icon="el-icon-download" v-if="show[2]" @click="exportList" > 匯出</el-button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Array,
      default: () => {
        return [true, true, true]
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
</style>
