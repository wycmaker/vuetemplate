<template>
  <el-table-column :label="label" type="index" :index="configIndex" :min-width="width" :class-name="className" align="center"></el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ],
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    /**
     * 取得Table Index欄位的值
     * @param {number} index 索引值
     */
     configIndex(index) {
      return (this.currentPage - 1) * this.pageSize + (index + 1)
    },
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>