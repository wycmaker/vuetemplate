<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      <el-checkbox 
        v-model="scope.row[prop]" 
        :disabled="scope.row.disable" 
        @change="(val) => checkboxChange(scope.row)" 
      ></el-checkbox>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ],
  methods: {
    /**
     * checkbox變更函數
     * @param {boolean} val 變更的數值
     */
    checkboxChange(val) {
      this.$emit('checkbox-change', val)
    },
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

</style>