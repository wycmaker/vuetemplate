<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      <el-input 
        v-model="scope.row[prop]" 
        :disabled="scope.row.disable" 
        @blur="(val) => inputBlur(scope.row)" 
        @change="(val) => inputChange(scope.row)" 
      ></el-input>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'
export default {
  mixins: [ TableColumn ],
  methods: {
    /**
     * input blur事件觸發函式
     * @param {object} val 變更的數值
     */
     inputBlur(val) {
      this.$emit('input-blur', val)
    },
    /**
     * input change事件觸發函數
     * @param {number|string} val 實際的數值
     */
    inputChange(val) {
      this.$emit('input-change', val)
    },
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

</style>