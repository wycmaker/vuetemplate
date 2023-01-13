<template>
  <div :class="$style.center">
    <el-button :class="$style['btn-B']" v-loading="loading" @click="confirm" v-if="show[0]">{{ confirmText }}</el-button>
    <el-button :class="$style['btn-C']" :disabled="loading" @click="cancel" v-if="show[1]">{{ cancelText }}</el-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Array,
      default: () => { return [ true, true ] }
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '確定'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * 按下確定按鈕
     */
    confirm() {
      this.$emit('confirm')
    },
    /**
     * 按下取消
     */
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .center {
    margin-top: 10px;
  }
</style>