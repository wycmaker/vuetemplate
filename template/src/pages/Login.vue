<template>
  <div :class="$style.content">
    <el-form :model="loginAttr" label-position="right" label-width="20px" ref="loginForm" @keyup.enter.native="login" :class="[$style.form, $style.loginForm]">
      <el-form-item label="帳號" style="margin-bottom: 0px" label-width="95px">
      </el-form-item>
      <el-form-item label="" style="margin-bottom: 15px">
        <el-input v-model="loginAttr.account"></el-input>
      </el-form-item>
      <el-form-item label="密碼" style="margin-bottom: 0px" label-width="95px">
      </el-form-item>
      <el-form-item label="" style="margin-bottom: 15px">
        <el-input v-model="loginAttr.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="" label-width="0px" style="text-align: center;margin-top: 30px">
        <el-button :class="$style['btn-A']" @click="login" :disabled="loading">登　入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Info, ApiService } from '@/services'
const infowindow = new Info()
const apiService = new ApiService()

export default {
  data() {
    return {
      loginAttr: {
        account: null,
        password: null
      },
      loading: false,
    }
  },
  mounted() {

  },
  methods: {
    /**
     * 登入
     */
    login() {
      var accountValidate = (this.loginAttr.account === null || this.loginAttr.account.trim() === '')
      var passwordValidate = (this.loginAttr.password === null || this.loginAttr.password.trim() === '')

      if(accountValidate && passwordValidate) infowindow.alert(this, '請輸入帳號與密碼')
      else if(accountValidate) infowindow.alert(this, '請輸入帳號')
      else if(passwordValidate) infowindow.alert(this, '請輸入密碼')
      else {
        // 進行登入處理
        this.loading = true
        apiService.postData('/api/Account/Login', this.loginAttr).then(res => {
          if(res.data.item1.isSuccess) {
            this.storeUserInfo(res.data.item2)
            infowindow.success(this, res.data.item1.successMessage)
          } else infowindow.error(this, res.data.item1.exceptionMessage)
        }).catch(err => {
          infowindow.error(this, err)
        }).finally(_ => {
          this.loading = false
        })
      }
    },
    /**
     * 記錄使用者登入資訊
     * @param {Object} data 使用者資訊
     */
    storeUserInfo(data) {
      var info = JSON.parse(JSON.stringify(data))
      delete info.token
      delete info.expiryDateTime
      this.$store.commit('setUserInfo', data);
      localStorage.setItem('userInfo_template', JSON.stringify(info));
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .content {
    display: flex;
    align-items: center;
    @include block-size-setting(calc(100vw - 40px), 100vh, center, unset, unset, -60px 0 0 0);
    @include background-image-setting(unset, calc(100vw - 40px), calc(100vh + 20px), 0);

    & img {
      margin-right: calc((100vw - 300px - 306.8px) / 2 * -1);
      margin-left: calc((100vw - 300px - 306.8px - 100px) / 2);
    }
  }

  .loginForm {
    @include block-size-setting(300px, 200px, unset, inherit, unset, 0 auto);
    @extend %form-shared;
    margin-top: -50px;

    :global {
      .el-form-item__label {
        font-size: 24px;
      }

      .el-input__inner, .el-input.is-disabled .el-input__inner {
        height: 40px;
        border-radius: 40px;
        line-height: 80px;
        font-size: 18px;
        background-color: $white-color;
        border-color: $border-color;
        color: $font-color-7;
      }

      .el-input .el-input__clear {
        color: $font-color-7;
      }
    }

    & .btn-A {
      @include font-setting(24px, bold, unset, unset);
      width: 280px;
      margin-left: 20px;
      border-radius: 23px;
    }
  }

  .logo {
    position: absolute;
    top: 120px;
    left: calc((100vw - 411px - 500px) / 2 * -1);
  }
</style>