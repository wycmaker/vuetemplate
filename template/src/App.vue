<template>
  <div id="app">
    <el-container>
      <router-view name="sidemenu"></router-view>
      <el-container>
        <el-header height="60px">
          <router-view name="header"></router-view>
        </el-header>
        <router-view v-if="isActive"></router-view>
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
      isActive:true
    }
  },
  methods: {
    /**
     * 重新載入頁面
     */
    reload() {
      this.isActive = false
      this.$nextTick(() => {
        this.isActive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.el-header {
  padding: 0 !important;
}

pre {
  margin: 0;
}
</style>

<style lang="scss" module>
@import "@/assets/css/custom.scss";
</style>
