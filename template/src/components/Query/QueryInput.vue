<template>
  <div :class="[$style['query-item']]">
    <label style="display:inline-block;" :style="(titleWidth !== null && titleWidth !== '') ? `width: ${titleWidth}` : ''">{{ title }}</label>
    <el-input v-model="bindValue" placeholder="" clearable :style="`width: ${width}`"></el-input>
  </div>
</template>

<script>
import { QueryItem } from '@/mixins'

export default {
  mixins: [ QueryItem ],
  props: {
    width: {
      type: String,
      default: '160px'
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

</style>