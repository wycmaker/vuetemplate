<template>
  <el-pagination
    :class="$style.page"
    layout="total, sizes, prev, pager, next, jumper"
    background
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    total: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
    }
  },
  mounted() {

  },
  methods: {
    /**
     * 資料數變更函數
     * @param {number} size 每頁資料數
     */
    sizeChange(size) {
      this.pageSize = size
      this.getData(false)
    },
    /**
     * 頁面變更函數
     * @param {number} page 頁數
     */
    currentChange(page) {
      this.currentPage = page
      this.getData(true)
    },
    /**
     * 取得資料
     * @param {boolean} isChange 頁面變更函數
     */
    getData(isChange) {
      let skip = (isChange === true) ? (this.currentPage - 1) * this.pageSize : 0
      this.$emit('getData', skip)
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  // @mixin style-setting($color, $background, $border) {
  //   color: $color !important;
  //   background-color: $background !important;
  //   border: 1px solid $border !important;
  // }

  .page {
    text-align: center;
    margin-top: 15px;

    // :global {
    //   .el-pagination__total, .el-input__inner, .el-pagination__jump {
    //     color: $font-color-1;
    //     font-size: 14px;
    //   }

    //   .el-input__inner {
    //     background-color: $white-color;
    //     border-color: $border-color-1;
    //   }

    //   .el-select .el-input__inner:focus, .el-pagination__sizes .el-input .el-input__inner:hover {
    //     border-color: $border-color-1;
    //   }

    //   .el-pager li, .btn-prev, .btn-next{
    //     @include style-setting($placeholder-color, $white-color, $border-color-1);
    //   }

    //   .el-pager li.active{
    //     @include style-setting($white-color, $background-color-6, $background-color-6);
    //   }

    //   .el-input--mini .el-input__inner {
    //     height: 28px;
    //     line-height: 28px;
    //   }

    //   .el-pagination__jump .el-input__inner {
    //     padding: 0 3px;
    //   }
    // }
  }

</style>