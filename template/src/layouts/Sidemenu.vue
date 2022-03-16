<template>
  <div :class="[$style.background, (show === true) ? $style.open : $style.close]">
    <i @click="collapse" class="el-icon-s-operation" :class="$style.collapse"></i>
    <!-- 多層Menu結構使用 -->
    <!-- <template>
      <ul :class="[$style['menu-main']]">
        <li v-for="(item, index) in menuList" :key="index">
          <p @click="foldMenu(item.name)" style="margin: 10px 0px" :class="[$style['menu-item'], (item.subList.map(r => r.path).includes(nowActive)) ? $style.active : $style.notActive]">
            <i :class="item.icon"></i>
            <template v-if="show">{{item.label}}　</template>
            <i class="el-icon-arrow-up" :class="(fold === item.name) ? $style.up : $style.down" v-if="show"></i>
          </p>
          <transition name="slide-fade" v-if="show">
            <ul :class="[$style['menu-sub']]" v-if="fold === item.name">
              <template v-for="(url, urlIndex) in item.subList">
                <a :key="urlIndex" @click="changePage(url.path)" v-if="url.show"><li :class="[(nowActive == url.path) ? $style.active : $style.notActive]">{{ url.name }}</li></a>
              </template>
            </ul>
          </transition>
        </li>
      </ul>
    </template> -->
    <!-- 單層Menu結構使用 -->
    <template>
      <ul :class="[$style['menu-main']]">
        <transition-group name="slide-fade" v-if="show">
          <template v-for="(url, urlIndex) in menu">
            <a :key="urlIndex" @click="changePage(url.path)" v-if="url.show">
              <li :class="[(nowActive == url.path) ? $style.active : $style.notActive]">
                　{{ url.name }}
              </li>
            </a>
          </template>
        </transition-group>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  inject:['reloadPage'],
  data() {
    return {
      fold: '',
      show: false,
      oldFold: '',
      /* 單層Menu結構使用 */
      menu: [
        {
          icon: '',
          name: '病歷清單',
          path: '',
          show: true
        },
        {
          icon: '',
          name: '病歷匯出管理',
          path: '1',
          show: true
        },
        {
          icon: '',
          name: '資料統計查詢',
          path: '2',
          show: true
        },
        {
          icon: '',
          name: '醫師班表管理',
          path: '3',
          show: true
        },
        {
          icon: '',
          name: '帳號權限管理',
          path: '4',
          show: true
        },
      ],
      /* 多層Menu結構使用 */
      // menuList: [
      //   { 
      //     icon: 'el-icon-tickets', 
      //     name: 'reportSystem',
      //     label: '報告系統',
      //     subList: [
      //       { 
      //         name: '報告清單',
      //         path: '',
      //         show: true
      //       },
      //       { 
      //         name: '醫囑公式',
      //         path: 'doctororderformula',
      //         show: true
      //       },
      //       { 
      //         name: '報告紀錄查詢',
      //         path: 'importquery',
      //         show: true
      //       },
      //       { 
      //         name: '睡眠問卷查詢',
      //         path: 'questionnairelist',
      //         show: true
      //       },
      //       { 
      //         name: '匯出報表',
      //         path: 'chartexport',
      //         show: true
      //       },
      //     ]
      //   },
      //   { 
      //     icon: 'el-icon-setting', 
      //     name: 'accountManage',
      //     label: '帳號管理',
      //     subList: [
      //       { 
      //         name: '使用者維護',
      //         path: 'usermanage',
      //         show: true
      //       },
      //       { 
      //         name: '群組維護',
      //         path: 'groupmanage',
      //         show: true
      //       },
      //       { 
      //         name: '範本維護',
      //         path: 'templatemanage',
      //         show: true
      //       },
      //       { 
      //         name: '個人資料修改',
      //         path: 'personalpage',
      //         show: true
      //       },
      //     ]
      //   }
      // ],
      currentPath: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      /* 多層Menu結構使用 */
      var pathName = location.hash.toLowerCase().getPath()
      this.menuList.forEach(item => {
        item.subList.forEach(url => {
          if(url.path === pathName) this.oldFold = item.name
        })
      })
    })
  },
  methods: {
    foldMenu(type) {
      if(this.show) {
        if(type === this.fold) this.fold = ''
        else this.fold = type
        this.oldFold = this.fold
      }
    },
    /**
     * 轉跳頁面
     */
    changePage(pagePath) {
      var path = location.hash.toLowerCase().getPath()
      if(path === pagePath) {
        this.reloadPage()
      } else {
        this.$router.push('/' + pagePath)
      }
    },
    /**
     * 摺疊側邊選單
     */
    collapse() {
      this.show = !this.show
      this.$emit('change', this.show)
      if(this.fold !== '') {
        this.oldFold = this.fold
        this.fold = ''
      } 
      else {
        this.fold = this.oldFold
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
  }
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: opacity .5s ease;
  }
  .slide-fade-leave-active {
    transition: opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .background {
    @include font-setting(20px, bold, $white-color);
    @include block-size-setting(210px, 100vh, center, $sidemenu-background);
  }

  .down {
    transform: rotate(-180deg);
    transition:transform 0.4s linear;
  }

  .up {
    transform: rotate(0deg);
    transition:transform 0.4s linear;
  }

  .open {
    width: 210px;
    color: $icon-color;
    transition: width 0.4s;
  }

  .close {
    width: 40px;
    color: $white-color;
    transition: width 0.4s;
  }

  .show {
    width: 180px;
    opacity: 1;
    transition: all 0.4s ease-out;
  }

  .hide {
    width: 0px;
    opacity: 0;
    transition: all 0.4s ease-out;
  }

  .menu {

    &-main {
      @extend %menu-shared;
      cursor: default;
      @include block-size-setting(180px, unset, left, unset, unset, 90px 0 0 0);

      -webkit-user-select:none;
      -moz-user-select:none;
      -o-user-select:none; 
      user-select:none;
    }

    &-main li {
      margin: 15px 0 15px 10px;
      cursor: pointer;
    }

    &-main a {
      text-decoration: none;
    }

    &-sub {
      @extend %menu-shared;
      margin-left: 30px;

      a {
        cursor: pointer;
      }
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
    &:hover {
      color: $hover-color-7;
    }
  }

  .collapse {
    position: absolute;
    top: 30px;
    left: 10px;
  }
</style>
