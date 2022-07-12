<template>
  <div :class="[$style.block, (needBack === false) ? $style['title-normal'] : $style['title-back']]">
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
    @include button-color-setting($white-color, $subtitle-color, $subtitle-color, $white-color, $subtitle-color, $subtitle-color, $hover-color-2);
    border-radius: 20px;
    padding: 12px;
  }

  .title {
    @include font-setting(22px, unset, $subtitle-color, 36px);

    &-normal {
      margin-bottom: 0px;
    }

    &-back {
      margin-bottom: 20px;
    }
  }
</style>
