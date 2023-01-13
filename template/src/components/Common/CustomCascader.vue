<template>
  <el-cascader
    v-model="chooseValue"
    :options="optionsValue"
    :props="{ multiple: true }"
    placeholder=""
    clearable
    :collapse-tags="collapseTags"
    @change="handleChange"
  >
  </el-cascader>
</template>

<script>
export default {
  props: {
    choose: {
      type: [ Array, Number, String, Boolean ]
    },
    options: {
      type: Array,
      default: () => { return [] }
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
  computed: {
    chooseValue: {
      get() {
        return this.choose
      },
      set(newValue) {
        this.$emit('update:choose', newValue)
      }
    },
    optionsValue: {
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
  @import '@/assets/css/custom.scss';

</style>