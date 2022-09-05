<template>
  <div id="app" :class="$style.main">
    <el-container>
      <router-view name="sidemenu" @change="menuChange"></router-view>
      <el-container :class="(show === true) ? $style.open : $style.close">
        <el-header height="60px">
          <router-view name="header"></router-view>
        </el-header>
        <router-view ref="page"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reloadPage: this.reload 
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.$store.commit('setClientWidth', document.body.clientWidth)
    window.onresize = () => {
      this.$store.commit('setClientWidth', document.body.clientWidth)
    }
  },
  methods: {
    /**
     * 重新載入頁面
     */
    reload() {
      this.$refs['page'].backToList(true)
    },
    /**
     * 側邊欄寬度改變
     * @param {boolean} show 是否展開
     */
    menuChange(show) {
      this.show = show
    }
  }
}
</script>

<style>
#app {
  font-family: "微軟正黑體", "Microsoft JhengHei", "PingFang", "LiHei Pro", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none; */
  /* user-select:none; */
}

body {
  margin: 0;
}

.el-header {
  padding: 0 !important;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: normal;
  word-break: normal;
}

.el-image-viewer__wrapper img {
  max-height: 100% !important;
  max-width: 90% !important;
}

.el-image-viewer__actions, .el-image-viewer__actions__inner {
  display: none !important;
}

.el-message-box__content {
  white-space: pre-line;
}
</style>

<style lang="scss" module>
@import "@/assets/css/custom.scss";

.main {
  @include background-image-setting(unset, 100vw, 100vh, 0);
}

.open {
  width: calc(100vw - 210px);
  transition: width 0.4s;
}

.close {
  width: calc(100vw - 40px);
  transition: width 0.4s;
}
</style>
