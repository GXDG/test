<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/images/logo.png" height="100" alt="">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-input
          placeholder="请输入用户名"
          suffix-icon="fa fa-user"
          v-model="userName"
          style="margin-bottom: 18px"
      >
      </el-input>

      <el-input
          placeholder="请输入密码"
          suffix-icon="fa fa-keyboard-o"
          v-model="password"
          type="password"
          style="margin-bottom: 18px"
          @keyup.native.enter="login"
      >
      </el-input>
<el-alert
 v-text="errMsg"
 v-show="isShowErr"
    title="errMsg"
    type="error"
      show-icon>
  </el-alert>
      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login1"
      >登录
      </el-button>
      <div>
        <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
      Remenber: true,
      loginLoading: false,
      isShowErr:false,
      errMsg:'',
    };
  },
  methods: {
    login() {
      let APP = this;
      APP.loginLoading = true;
      setTimeout(() => {
        sessionStorage.setItem(APP.$Config.tokenKey, "123456789");
        APP.$notify({
          title: "登录成功",
          message: "很高兴你使用ElementUIAdmin！别忘了给个Star哦。",
          type: "success"
        });
        APP.loginLoading = false;
        APP.$router.push({ path: "/" });
      }, 1000);
    },
    login1() {
      let APP = this;
      APP.loginLoading = true;
      //         this.$axios({
      //   method: 'post',
      //   url: '/doLogin',
      //   data: {login_name:123,password:123}
      // })
      this.$axios
        .post("/admin/doLogin", {
          login_name: APP.userName,
          password: APP.password
        })
        .then(response => {
         
          if (response.data.code == 200) {
            APP.$notify({
              title: "登录成功",
              message: "很高兴你使用ElementUIAdmin！别忘了给个Star哦。",
              type: "success"
            });
   sessionStorage.setItem(APP.$Config.tokenKey, "123456789");
            APP.$router.push({ path: "/" });
          }else{
                 APP.isShowErr=true;
                 APP.errMsg=response.data.msg
          }

        })
        .finally(() => {
          APP.loginLoading = false;
        });
      // this.$axios.post('http://127.0.0.1:3000/admin/doLogin',{login_name:123,password:123})
      // .then(response=>{
      //   debugger
      //   APP.loginLoading = false;
      //   APP.$router.push({path: '/'});
      // })
    }
  }
};
</script>

<style lang="less">
@import "Login.less";
</style>