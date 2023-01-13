<template>
  <div>
    <el-switch
      v-model="enable"
      active-color="#616AFE"
      inactive-color="#8686BC"
      :active-text="switchText[0]"
      :inactive-text="switchText[1]"
      @change="onChange"
      :disabled="disabled"
      :class="$style.switch"
    >
    </el-switch>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'update'
    },
    props: {
      value: {
        type: [Boolean],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      switchText: {
        type: Array,
        default: () => { return [ '啟用', '停用'] }
      }
    },
    data() {
      return {

      }
    },
    computed: {
      enable: {
        get() {
          return this.value
        },
        set(newValue) {
          this.$emit('update', newValue)
        }
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      onChange(val) {
        this.$emit('change', val)
      }
    },
  }
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  @include switch-setting($switch-active, $switch-unactive, $switch-default);
</style>