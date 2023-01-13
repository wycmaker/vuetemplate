<template>
  <div :class="[$style.block, (needBack === false) ? $style['title-normal'] : null, moveTitle === true ? $style['title-move'] : $style['title-close']]">
    <el-button v-if="needBack" @click="goBack" :class="[$style.btn]">
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
    },
    'move-title': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$emit('back')
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
    @include button-color-setting($white-color, $subtitle-color, $subtitle-color, $white-color, $subtitle-color, $subtitle-color, $hover-color-6);
    border-radius: 20px !important;
    padding: 12px !important;
  }

  .title {
    @include font-setting(22px, unset, $subtitle-color, 36px);

    &-normal {
      margin-bottom: 0px;

      & h1 {
        margin: 0;
      }
    }

    &-move {
      margin-left: 70px;
      transition: margin-left 0.4s;
    }

    &-close {
      margin-left: 0px;
      transition: margin-left 0.4s;
    }
  }
</style>
