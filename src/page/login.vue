<template>
  <div class="login_page fillcontain">
    <div style="background: #000000">
    </div>
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <p style="text-align: left">登录</p>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="inputPadding"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号名"
            ></el-input >
          </el-form-item>
          <el-form-item prop="password" v-if="!isSMSLogin">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>

        <div>
          <el-button class="phoneLogin" @click="loginPost()">
            <span class="buttonText">登录</span>
          </el-button>
        </div>
      </section>
    </transition>

    <div class="manage_tip">
    </div>
  </div>
</template>

<script>
import { login } from "@/api/getData";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {},
    };
  },
  mounted() {

  },
  computed: {

  },
  methods: {

    loginPost() {
        this.$router.push("/home");
        // this.passwordLoginPost();
    },
    async passwordLoginPost() {
      console.log("点击登录");
      if (this.identifyCode != this.loginForm.code) {
        this.$message({
          type: "error",
          message: "验证码不正确",
          offset: 100,
        });
        return;
      }
      const res = await login({
        userName: this.loginForm.username,
        password: this.loginForm.password,
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "登录成功",
          offset: 100,
        });
        localStorage.setItem("token", res.result);
        this.getUserInfo();
          this.$router.push("/index");
      } else {
        this.$message({
          type: "error",
          message: res.msg,
          offset: 100,
        });
      }
    },
  },
  watch: {
  },
  components: {
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-image: url("../assets/img/bg.jpg");
}
.image {
  height: 28px;
  padding: 16px 26px;
}
.login_top {
  float: right;
  padding: 19px 26px;
  color: #fff;
}
.inputPadding {
  padding-top: 18px;
}
.phoneLogin {
  background: #006FFF;
  width: 100%;
  padding: 8px 20px;
}
.buttonImg {
  height: 28px;
  float: left;
}

.buttonText {
  font-size: 16px;
  color: #fff;
  line-height: 28px;
}
.manage_tip {
  position: absolute;
  width: 100%;
  bottom: 10px;
  p {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
.form_contianer {
  // .wh(356px, 380px);
  // .ctp(356px, 380px);
  position: absolute;
  left: 40%;
  top: 30%;
  width: 20%;
  height: auto;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.codePsw {
  display: flex;
  justify-content: space-between;
  justify-items: center;
}

.login-bottom-area {
  display: flex;
  justify-content: space-between;
}
</style>
