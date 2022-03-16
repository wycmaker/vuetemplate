<template>
  <div :class="$style.center">
    <el-button :class="$style['btn-B']" v-loading="loading" @click="confirm">確定</el-button>
    <el-button :class="$style['btn-C']" :disabled="loading" @click="cancel">取消</el-button>
  </div>
</template>

<script>
export default {
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