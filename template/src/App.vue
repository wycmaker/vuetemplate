<template>
  <div id="app" :class="$style.main">
    <router-view name="sidemenu" @change="menuChange" :class="(show == true) ? $style.menuOpen : $style.menuClose"></router-view>
    <div style="display:inline-block" :class="(show == true) ? $style.open : $style.close">
      <router-view name="header" ref="header"></router-view>
      <router-view ref="page"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reloadPage: this.reload,
      isShow: this.getShowState
    }
  },
  data() {
    return {
      show: true
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
      this.$refs['page'].backToList()
    },
    /**
     * 側邊欄寬度改變
     * @param {boolean} show 是否展開
     */
    menuChange(show) {
      this.$refs.header.moveTitle(show)
      this.show = show
    },
    getShowState() {
      return this.show
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
  overflow: hidden;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
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

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  background-color: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(144, 147, 153, 0.5);
}
</style>

<style lang="scss" module>
@import "@/assets/css/custom.scss";

.main {
  @include background-image-setting(unset, 100vw, 100vh, 0);
  display: flex;
}

.open {
  width: calc(100vw - #{$sidemenu-width});
  transition: width 0.4s;
  @media (max-width: 1180px) {
    width: calc(100vw - #{$sidemenu-width} - 10px);
  }
  
}

.close {
  width: calc(100vw);
  transition: width 0.4s;
}

.menuOpen {
  width: $sidemenu-width;
  transition: width 0.4s;
}

.menuClose {
  width: 0;
  transition: width 0.4s;
}
</style>
