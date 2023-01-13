<template>
  <div :class="[$style['query-item']]">
    <label style="display:inline-block;" :style="(titleWidth !== null && titleWidth !== '') ? `width: ${titleWidth}` : ''">{{ title }}</label>
    <custom-select
      :dataList.sync="options"
      :choose.sync="bindValue"
      :clearable="clearable"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      :use-label="useLabel"
      @change="selectChange"
      :style="`width: ${width}`"
    ></custom-select>
  </div>
</template>

<script>
import { QueryItem } from '@/mixins'

export default {
  mixins: [ QueryItem ],
  props: {
    value: {
      type: [ Array, Number, String, Boolean ],
      default: null
    },
    options: {
      type: Array,
      default: () => { return [] }
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '160px'
    },
    'collapse-tags': {
      type: Boolean,
      default: false
    },
    'use-label': {
      type: Boolean,
      default: false
    },
  },
  methods: {
    selectChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>