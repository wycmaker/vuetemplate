<template>
  <div :class="[$style['query-item']]">
    <label style="display:inline-block;" :style="(titleWidth !== null && titleWidth !== '') ? `width: ${titleWidth}` : ''">{{ title }}</label>
    <custom-cascader
      :options.sync="options"
      :choose.sync="bindValue"
      :clearable="clearable"
      :collapse-tags="collapseTags"
      :style="`width: ${width}`"
      @change="handleChange"
    ></custom-cascader>
  </div>
</template>

<script>
import { QueryItem } from '@/mixins'
import CustomCascader from '@/components/Common/CustomCascader.vue'

export default {
  components: { CustomCascader },
  mixins: [ QueryItem ],
  props: {
    width: {
      type: String,
      default: '160px'
    },
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
    width: {
      type: String,
      default: '160px'
    },
    'collapse-tags': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  },
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';

</style>