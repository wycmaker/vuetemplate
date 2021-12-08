<template>
  <div>
    <div :class="$style.background">
      <div style="width: 20px">
      </div>
      <div v-if="$store.state.userInfo !== null">
        <div style="display:inline-block;">
          <span>Hi,{{ this.$store.state.userInfo.userName }}</span>
          <div style="display:inline-block;cursor: pointer;margin-left:20px" @click="logout">
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
        } else infowindow.error(res.data.expectionMessage)
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
    background-color: $sidemenu-background;
    display:flex;
    height: 60px;
    align-items:center;
    justify-content: space-between;
    font-weight: bold;
    color: $white-color;
    padding: 0 15px;
  }
</style>