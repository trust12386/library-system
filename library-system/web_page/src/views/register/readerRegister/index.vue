<template>
  <div class="register-container">
    <div class="register-head">
      <img src="./logo.png" alt="">
    </div>
    <el-form class="register-form" status-icon ref="register-form" :model="register" :rules="FormRules" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="register.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="register.pass" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="register.checkPass" placeholder="请再次输入密码" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" :loading="RegisterLoading" @click="onRegister">注册</el-button>
        <el-button class="register-btn" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { readerRegister } from '@/api/user'

export default {
  name: 'registerIndex',
  components: {},
  props: {},
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.register.checkPass !== '') {
        //   this.$refs.register.validateField('checkPass')
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      register: {
        account: '',
        pass: '',
        checkPass: ''
      },
      RegisterLoading: false,
      FormRules: {
        account: [
          { validator: validateAccount, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onRegister () {
      this.$refs['register-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.Register()
      })
    },
    Register () {
      this.RegisterLoading = true
      readerRegister(this.register).then(res => {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        this.RegisterLoading = false
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      }).catch(err => {
        console.log('注册失败!', err)
        this.$message.error('注册失败')
        this.RegisterLoading = false
      })
    },
    resetForm () {
      this.$refs['register-form'].resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.register-container{
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
.register-head {
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
.register-form {
  background-color: #fff;
  padding: 50px 175px 50px 115px;
  min-width: 400px;
}
.register-btn {
  width: 48%;
}
</style>
