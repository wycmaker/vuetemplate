<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      <el-input 
        v-model="scope.row[prop]" 
        :disabled="scope.row.disable" 
        type="textarea" 
        :rows="rows" 
      ></el-input>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ],
  props: {
    rows: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>