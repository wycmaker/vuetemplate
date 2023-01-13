<template>
  <div :class="[$style.query]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {
  },
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>