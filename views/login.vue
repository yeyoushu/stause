<template>
  <div
    class="login-container image"
    :style="{ backgroundImage: `url(${img})` }"
  >
    <div class="asdsa">
      <el-form
        :model="dataForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h3 class="title" style="text-align: center">欢迎使用后台管理系统</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="dataForm.username"
            auto-complete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="dataForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" @click="handleSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      img: require("@/router/01.jpg"),
      login: false,
      dataForm: {
        username: "",
        password: "",
        role: "member",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      checked: false,
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("/cgi/sys/login?" + querystring.stringify(this.dataForm))
        .then((value) => {
          localStorage.setItem("time", new Date());
          localStorage.setItem("mess", value.data.data.user.account);
          this.$router.push("/Index");
        });
    },
  },
};
</script>
<style scoped>
.image {
  width: 100%;
  height: 823px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0;
  overflow: hidden;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

label.el-checkbox.remember {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>