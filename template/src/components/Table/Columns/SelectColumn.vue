<template>
  <el-table-column :label="label" :min-width="width" :prop="prop" :align="align" :class-name="className">
    <template slot-scope="scope">
      <custom-select
        :dataList.sync="optionValue"
        :choose.sync="scope.row[prop]"
        :clearable="clearable"
        :multiple="multiple"
        :disabled="scope.row.editable()"
        @change="(val) => selectChange(scope.row)"
        v-if="load"
      ></custom-select>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from '@/mixins'

export default {
  mixins: [ TableColumn ],
  props: {
    options: {
      type: Array,
      default: () => { return [] }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    load: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * selct change事件觸發函數
     * @param {Number} val 變更的數值
     */
    selectChange(val) {
      this.$emit('select-change', val)
    },
  },
  computed: {
    optionValue: {
      get() {
        return this.options
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

</style>