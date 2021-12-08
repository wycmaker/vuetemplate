<template>
  <div>
    <template v-if="!showForget">
      <h1>系統登入</h1>
      <el-form :model="loginAttr" label-position="right" label-width="80px" ref="loginForm" :class="[$style.form, $style.loginForm]" v-loading="loading">
        <el-form-item label="帳號：">
          <el-input v-model="loginAttr.account"></el-input>
        </el-form-item>
        <el-form-item label="密碼：">
          <el-input v-model="loginAttr.password" show-password></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="login">登入</el-button>
          <!-- <a @click="showForget = true">忘記密碼</a> -->
        </div>
      </el-form>
    </template>
    <template v-else>
      <div :class="$style.forgetDiv">
        <main-title need-back title="返回登入" @back="backToLogin"></main-title>
        <el-form :model="forgetAttr" label-width="120px" label-position="right" ref="forgetForm" :rules="rules" :class="[$style.form, $style.forgetForm]" v-loading="loading">
          <el-form-item label="帳號：" prop="account">
            <el-input v-model="forgetAttr.account"></el-input>
          </el-form-item>
          <div :class="$style.center" v-if="!getValidateSuccess">
            <el-button type="primary" @click="getValidateCode">取得驗證碼</el-button>
          </div>
          <template v-else>
            <el-form-item label="舊密碼：" prop="oldPassword">
              <el-input v-model="forgetAttr.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密碼：" prop="newPassword">
              <el-input v-model="forgetAttr.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="確認密碼：" prop="confirmPassword">
              <el-input v-model="forgetAttr.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="驗證碼：" prop="validateCode">
              <el-input v-model="forgetAttr.validateCode">
                <el-button slot="append" type="success">重新取得</el-button>
              </el-input>
              
            </el-form-item>
            <div :class="$style.center">
              <el-button type="primary">確認修改</el-button>
            </div>
          </template>
        </el-form>
      </div>
      
    </template>
  </div>
</template>

<script>
import { MainTitle } from '@/services/componentLibrary'
import { Info, ApiService } from '@/services'
const infowindow = new Info()
const apiService = new ApiService()

export default {
  components: { MainTitle },
  data() {
    return {
      loginAttr: {
        account: null,
        password: null
      },
      loading: false,
      showForget: false,
      forgetAttr: {
        account: null,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        validateCode: null
      },
      getValidateSuccess: false,
      rules: {
        account: [
          { required: true, message: '帳號不可為空', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '帳號不可為空', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '帳號不可為空', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '帳號不可為空', trigger: 'blur' },
        ],
        validateCode: [
          { required: true, message: '帳號不可為空', trigger: 'blur' },
        ]
      }
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
      localStorage.setItem('userInfo', JSON.stringify(info));
      this.$router.push('/');
    },
    /**
     * 返回登入
     */
    backToLogin() {
      this.showForget = false;
      var data = {
        account: null,
        password: null
      };
      this.getValidateSuccess = false;
      this.loginAttr = JSON.parse(JSON.stringify(data));
    },
    /**
     * 取得驗證碼
     */
    getValidateCode() {
      this.getValidateSuccess = true;
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .loginForm {
    width: 400px;
    margin: 0 auto;
    a {
      margin-left: 15px;
      text-decoration: underline;
      color: red;
      cursor: pointer;
    }
  }

  .forgetDiv {
    width: 400px;
    margin: 0 auto;
  }

  .forgetForm {
    :global {
      .el-input-group__append {
        .el-button {
          background-color: $subtitle-color;
          color: $white-color;

          & span {
            color: $white-color;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>