<template>
  <div :class="$style.background">
    <ul :class="[$style['menu-main']]">
      <li>
        <span :class="[$style['menu-item'], (nowActive === 'reportmanage' || nowActive === 'doctororderformula' || nowActive === 'importquery' || nowActive === 'questionnairelist') ? $style.active : $style.notActive]"><i class="el-icon-tickets"></i>報告系統</span>
        <ul :class="[$style['menu-sub']]">
          <a @click="changePage('reportmanage')"><li :class="[(nowActive == 'reportmanage') ? $style.active : $style.notActive]">報告清單</li></a>
          <a @click="changePage('doctororderformula')"><li :class="[(nowActive == 'doctororderformula') ? $style.active : $style.notActive]">醫囑公式</li></a>
          <a @click="changePage('importquery')"><li :class="[(nowActive == 'importquery') ? $style.active : $style.notActive]">報告紀錄查詢</li></a>
          <a @click="changePage('questionnairelist')"><li :class="[(nowActive == 'questionnairelist') ? $style.active : $style.notActive]">睡眠問卷查詢</li></a>
        </ul>
      </li>
      <li>
        <span :class="[$style['menu-item'], (nowActive === 'usermanage' || nowActive === 'groupmanage' || nowActive === 'personalpage' || nowActive === 'templatemanage') ? $style.active : $style.notActive]"><i class="el-icon-tickets"></i>帳號管理</span>
        <ul :class="[$style['menu-sub']]">
          <a @click="changePage('usermanage')"><li :class="[(nowActive == 'usermanage') ? $style.active : $style.notActive]">使用者維護</li></a>
          <a @click="changePage('groupmanage')"><li :class="[(nowActive == 'groupmanage') ? $style.active : $style.notActive]">群組維護</li></a>
          <a @click="changePage('templatemanage')"><li :class="[(nowActive == 'templatemanage') ? $style.active : $style.notActive]">範本維護</li></a>
          <a @click="changePage('personalpage')"><li :class="[(nowActive == 'personalpage') ? $style.active : $style.notActive]">個人資料修改</li></a>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject:['reloadPage'],
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    /**
     * 轉跳頁面
     */
    changePage(pagePath) {
      var currentPath = this.$route.path.substr(1, this.$route.path.length-1).toLowerCase()
      if(currentPath === pagePath) {
        this.reloadPage()
      } else {
        this.$router.push('/' + pagePath)
      }
    }
  },
  computed: {
		nowActive() {
      this.currentPath = this.$route.path;
      var path;
      if(this.currentPath === '/') path = '';
      else path = this.currentPath.substr(1, this.currentPath.length-1).toLowerCase();
      return path;
		}
  },
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
  @import "@/assets/css/variable.scss";
  @import "@/assets/css/style.scss";

  .background {
    background-color: $sidemenu-background;
    width: 200px;
    height: 100vh;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: $white-color;
  }

  .menu {
    
    &-main {
      @extend %menu-shared;
      width: 180px;
      text-align: left;
      margin-top: 90px;
      cursor: default;
    }

    &-main li {
      margin: 15px 0 15px 10px;
    }

    &-main a {
      text-decoration: none;
    }

    &-main i {
      margin-right: 10px;
    }

    &-sub {
      @extend %menu-shared;
      margin-left: 30px;

      a {
        cursor: pointer;
      }
    }

    &-item:hover, &-sub li:hover {
      color: $menu-color-2;
    }

    &-logo {
      margin-top: 25px;
    }

    &-picture {
      position: absolute;
      bottom: 20px;
      left: 10px;
      width: 180px;
      z-index: 2;
    }
  }

  .active {
    color: $menu-color-1;
  }

  .notActive {
    color: $white-color;
  }
</style>