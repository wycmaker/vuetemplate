<template>
  <div>
    <div :class="$style.background">
      <div style="width: 20px">
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
import { ApiService, Info } from '@/services'
const apiService = new ApiService()
const infowindow = new Info()

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    /**
     * 登出
     */
    logout() {
      apiService.getData('/api/Account/Logout', {}).then(res => {
        if(res.status === 401) {
          this.$router.push('Login');
        } else if(res.data.isSuccess) {
          this.$store.commit('clearUserInfo')
          this.$router.push('/Login')
        } else infowindow.error(this, res.data.expectionMessage)
      }).catch(err => {
        infowindow.error(this, err)
      })
    }
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
