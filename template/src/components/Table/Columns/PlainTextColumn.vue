<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      {{ scope.row[prop] }}
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ]
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>