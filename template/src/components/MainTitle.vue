<template>
  <div :class="[$style.block, (needBack === false) ? $style['title-normal'] : $style['title-back']]">
    <el-button v-if="needBack" @click="goBack" :class="[$style.btn, $style['btn-C']]">
      <i class="el-icon-back"></i>
    </el-button>
    <h1 :class="$style.title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    'need-back': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$emit('back');
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .block {
    display: flex;

    & h1 {
      margin: 0px 0px 0px 15px;
    }
  }

  .btn {
    border-radius: 20px;
    padding: 12px;
    color: $white-color;
    background-color: $subtitle-color;

    &:hover, &:focus {
      color: $white-color;
      background-color: $subtitle-color;
    }
  }

  .title {
    font-size: 22px;
    line-height: 36px;
    color: $subtitle-color;

    &-normal {
      margin-bottom: 0px;
    }

    &-back {
      margin-bottom: 20px;
    }
  }
</style>