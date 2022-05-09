<template>
<div class="login-container">
  <div class="login-head">
    <img src="./logo.png" alt="">
  </div>
  <el-form class="login-form" ref="login-form" :model="user" :rules="FormRules" label-width="80px">
    <el-form-item label="账号" prop="account">
      <el-input v-model="user.account" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="user.password" placeholder="请输入密码" show-password clearable></el-input>
    </el-form-item>
    <el-form-item class="login-check" prop="choice">
      <el-radio-group v-model="user.choice" @change="changeValue">
        <el-radio label="0">管理员</el-radio>
        <el-radio label="1">读者</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" :loading="LoginLoading" @click="onLogin">登录</el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="register-btn" @click="adminRegister" >管理员注册</el-button>
      <el-button class="register-btn" @click="readerRegister">读者注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        account: '',
        password: '',
        choice: ''
      },
      LoginLoading: false,
      FormRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        choice: [
          { required: true, message: '请选择你的登录身份', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeValue (value) {
      this.choice = value
    },
    //  登录验证
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.Login()
      })
    },
    //  axios请求封装函数
    Login () {
      this.LoginLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.LoginLoading = false
        setTimeout(() => {
          this.$router.push('/layout')
        }, 1000)
      }).catch(err => {
        console.log('登录失败!', err)
        this.$message.error('登录失败，账号或密码错误！')
        this.LoginLoading = false
      })
    },
    adminRegister () {
      this.$router.push('/adminRegister')
    },
    readerRegister () {
      this.$router.push('/readerRegister')
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("backgroud.png") no-repeat;
  background-size: cover;
}
.login-head {
  width: 650px;
  height: 97px;
  background-color: white;
  padding: 50px 20px 0 20px;
    img {
      width: 550px;
      height: 91px;
      margin: 0 0 0 40px;
    }
}
.login-form {
  background-color: #fff;
  padding: 50px 175px 50px 115px;
  min-width: 400px;
}
.login-btn {
  width: 100%;
}
.login-check {
  margin-left: 75px;
}
.register-btn {
  width: 48%;
}
</style>
