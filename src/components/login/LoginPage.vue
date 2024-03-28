<script setup>
import {reactive, ref} from 'vue'
import {ErrorInfo, SuccessInfo} from "../../utils/util.js";
import {Request} from "../../request/request";

import router from "../../router/index.js";


const form = reactive({
  phone: '',
  password: ''
})

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  },
};

const login = () => {
  Request.post('/user/login', form).then((res) => {
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.data.access_token)
      SuccessInfo("登录成功")
      console.log(res.data.data.role)
    }else{
      ErrorInfo(res.data.msg)
    }
    switch(res.data.data.role) {
      // 1 管理员，2工人，3 平台管理员
      case 1:
        router.push('/index/green')
        break;
      case 2:
        router.push('/staff')
        break;
      case 3:
        router.push('/admin/feedback')
        break;
      default:
        ErrorInfo("身份验证出错")
    }
  })
}
</script>

<template>
  <div class="login">
    <el-input class="login-button" v-model="form.phone"
              placeholder="手机号"/>
    <el-input type="password" class="login-button"
              v-model="form.password" placeholder="密码"/>
    <br>
    <el-button @click="login()" class="login-button"
               type="success">登录
    </el-button>
    <br>
    <router-link to="/reg">没有账号？立即注册</router-link>
  </div>
</template>

<style scoped>
.login-button {
  width: 80%;
  height: 60px;
  margin-left: 10%;
  margin-top: 10px;
  font-size: 25px;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
}

a {
  width: 80%;
  height: 60px;
  margin-left: 43%;
  margin-top: 10px;
}
</style>
