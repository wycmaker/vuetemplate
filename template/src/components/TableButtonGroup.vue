<template>
  <div :class="$style.center">
    <el-button type="primary" icon="el-icon-edit" :disabled="disable[0]" v-if="show[0]" @click="updateItem(scope.$index)"></el-button>
    <el-button type="danger" :icon="isDelete ? 'el-icon-delete' : 'el-icon-setting'" :disabled="disable[1]" v-if="show[1]" @click="deleteItem(scope.$index)"></el-button>
    <el-button type="warning" icon="el-icon-view" :disabled="disable[2]" v-if="show[2]" @click="watchItem(scope.$index)"></el-button>
  </div>
</template>

<script>
export default {
  props: {
    scope: {
      type: Object,
    },
    show: {
      type: Array,
      default: () => {
        return [true, true, false]
      }
    },
    disable: {
      type: Array,
      default: () => {
        return [false, false, false]
      }
    },
    isDelete: {
      type: Boolean,
      dafault: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * 按下修改按鈕
     * @param {number} index 陣列索引值
     */
    updateItem(index) {
      this.$emit('update', index)
    },
    /**
     * 按下刪除按鈕
     * @param {number} index 陣列索引值
     */
    deleteItem(index) {
      this.$emit('delete', index)
    },
    /**
     * 按下檢視按鈕
     * @param {number} index 陣列索引值
     */
    watchItem(index) {
      this.$emit('watch', index)
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>