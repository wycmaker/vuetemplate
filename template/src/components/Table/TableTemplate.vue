<template>
  <div>
    <custom-table :data="dataList" :border="border" :stripe="stripe" :class="classList" :height="height">
      <template v-slot:data>
        <slot></slot>
      </template>
    </custom-table>
    <pagination-bar
      v-if="showPages"
      :total="total"
      :current-page="current"
      :page-size="size"
      @handlePageChange="handlePageChange"
    ></pagination-bar>
  </div>
</template>

<script>
import CustomTable from '@/components/Common/CustomTable'
import PaginationBar from '@/components/Table/PaginationBar'

export default {
  components: { PaginationBar, CustomTable },
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    classList: {
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
      type: String,
      default: null
    },
    showPages: {
      type: Boolean,
      default: false
    },
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    /**
     * 頁面變更處理
     */
    handlePageChange(val) {
      this.$emit('handlePageChange', val)
    }
  },
  computed: {
    dataList: {
      get() {
        return this.data
      },
      set(newValue) {
        this.$emit('update:data', newValue)
      }
    },
    total: {
      get() {
        return this.totalCount
      },
      set(newValue) {
        this.$emit('update:totalCount', newValue)
      }
    },
    current: {
      get() {
        return this.currentPage
      },
      set(newValue) {
        this.$emit('update:currentPage', newValue)
      }
    },
    size: {
      get() {
        return this.pageSize
      },
      set(newValue) {
        this.$emit('update:pageSize', newValue)
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>