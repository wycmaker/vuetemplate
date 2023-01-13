<template>
  <div>
    <div :class="$style.background">
      <div style="width: 300px">
        <main-title :title="title" :need-back="needBack" :move-title="isMove" @back="backToList"></main-title>
      </div>
      <div v-if="$store.state.userInfo !== null">
        <div style="display:inline-block;">
          <span :class="$style['header-user']">Hi,{{ this.$store.state.userInfo.userName }}</span>
          <div :class="$style['header-logout']" @click="logout">
            <span>登出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from '@/components/MainTitle.vue'
export default {
  components: { MainTitle },
  data() {
    return {
      isMove: false
    }
  },
  mounted() {

  },
  methods: {
    /**
     * changePage
     */
    async logout() {
      try {
        const res = await this.$api.logout()
        if(res) {
          const { data } = res
          if(data.isSuccess) {
            this.$store.commit('clearUserInfo')
            this.$router.push('/login')
          } else this.$service.info.error(this, data.exceptionMessage)
        }
      }
      catch(err) {
        this.$service.info.error(this, err)
      }
    },
    /**
     * 返回列表
     */
    backToList() {
      let path = this.$route.path
      if(path.includes('/Medical/')) this.$router.push(this.$foldPath)
    },
    /**
     * 移動標題
     * @param {boolean} show 側邊欄是否顯示
     */
    moveTitle(show) {
      this.isMove = !show
    },
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .background {
    display:flex;
    align-items:center;
    justify-content: space-between;
    @include block-size-setting(unset, 60px, unset, unset, 0 15px, unset);
    @include font-setting(18px, bold, $white-color);
  }

  .header {
    &-user {
      @include font-setting(unset, bold, $font-color-3);
      position: relative;
      right: 50px;
    }

    &-logout {
      display:inline-block;
      cursor: pointer;
      margin-left:5px;
      @include font-setting(unset, 700, $font-color-4);
      img:nth-of-type(2):hover {
        opacity: 0;
      }
    }

    &-icon {
      position: absolute;
      height: 25px;
      top: 17px;
      right: 55px;
    }

    &-logo {
      position: relative;
      height: 45px;
      top: 2px;
    }
  }


</style>
