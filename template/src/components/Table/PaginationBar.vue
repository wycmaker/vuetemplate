<template>
  <el-pagination
    :class="$style.page"
    :layout="(pageCount === 5) ? 'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
    background
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPageValue"
    :page-sizes="pageSizes"
    :page-size="pageSizeValue"
    :total="total"
    :pager-count="pageCount"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      dafault: 10
    },
    currentPage: {
      type: Number,
      dafault: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    total: {
      type: Number,
      default: 0
    },
  },
  methods: {
    /**
     * 資料數變更函數
     * @param {number} size 每頁資料數
     */
    sizeChange(size) {
      this.pageSizeValue = size
      this.$emit('handlePageChange', {page: this.currentPageValue, size: size, isChange: false})
    },
    /**
     * 頁面變更函數
     * @param {number} page 頁數
     */
    currentChange(page) {
      this.currentPageValue = page
      this.$emit('handlePageChange', {page, size: this.pageSizeValue, isChange: true})
    },
  },
  computed: {
    pageSizeValue: {
      get() {
        return this.pageSize
      },
      set(newValue) {
        this.$emit('update:pageSize', newValue)
      }
    },
    currentPageValue: {
      get() {
        return this.currentPage
      },
      set(newValue) {
        this.$emit('update:currentPage', newValue)
      }
    },
    pageCount() {
      let clientWidth = this.$store.state.clientWidth
      if(clientWidth !== null) {
        if(clientWidth >= 1440) return 9
        else if(clientWidth >= 1024 && clientWidth < 1440) return 7
        else return 5
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .page {
    text-align: center;
    margin-top: 15px;

    :global {
      .el-pagination__total, .el-input__inner, .el-pagination__jump {
        @include font-setting(14px, unset, $font-color-1);
      }
      
      @include input-setting($font-color-1, $white-color, $border-color-1);

      .el-select .el-input__inner,
      .el-select .el-input__inner:focus, 
      .el-pagination__sizes .el-input .el-input__inner:hover, 
      .el-pagination__editor.el-input .el-input__inner,
      .el-pagination__editor.el-input .el-input__inner:hover:focus, 
      .el-pagination__editor.el-input .el-input__inner:hover:hover {
        border-color: $border-color-1;
      }

      .el-pager li, .btn-prev, .btn-next{
        @include pager-color-setting($font-color-3, $white-color, $border-color-1);
      }

      .el-pager li.active{
        @include pager-color-setting($white-color, $border-color-1, $border-color-1);
      }

      .el-input--mini .el-input__inner {
        height: 28px;
        line-height: 28px;
      }

      .el-pagination__jump .el-input__inner {
        padding: 0 3px;
      }
    }
  }

</style>
