<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      <custom-switch 
        v-model="scope.row[prop]"
        :disabled="scope.row.disable" 
        @change="(val) => switchChange(scope.row)" 
      ></custom-switch>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ],
  methods: {
    /**
     * switch變更函數
     * @param {object} data 使用者資料
     */
    switchChange(data) {
      this.$emit('switch-change', data)
    },
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

</style>