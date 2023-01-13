<template>
  <el-table-column :label="label" :width="width" :align="align" :prop="prop" :fixed="fix">
    <template slot="header">
      <slot name="header"></slot>
    </template>
    <template slot-scope="scope">
      <template v-if="!isCustom">
        <table-button-group 
          :scope="scope" 
          :show="show"
          :disable="[scope.row.editable, scope.row.watchable, scope.row.deleteable]"
          :isDelete="isDelete"
          @update="updateItem"
          @delete="deleteItem"
          @watch="watchItem"
        ></table-button-group>
      </template>
      <template v-else>
        <slot name="content" :row="scope.row" :index="scope.$index"></slot>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'
import TableButtonGroup from '@/components/Table/TableButtonGroup'
export default {
  components: { TableButtonGroup },
  mixins: [ TableColumn ],
  props: {
    show: {
      type: Array,
      default: () => { return [ false, false, false ]}
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    /**
     * 按下修改按鈕
     * @param {number} index 陣列索引值
     */
     updateItem(index) {
      this.$emit('update', index)
    },
    /**
     * 按下刪除按鈕
     * @param {number} index 陣列索引值
     */
    deleteItem(index) {
      this.$emit('delete', index)
    },
    /**
     * 按下檢視按鈕
     * @param {number} index 陣列索引值
     */
    watchItem(index) {
      this.$emit('watch', index)
    },
  },
}
</script>

<style>

</style>