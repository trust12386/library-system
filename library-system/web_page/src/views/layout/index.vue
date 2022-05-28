<template>
    <el-container class="container">
      <el-aside :width=wid class="aside">
        <AppAside class="menu-aside" :is-collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div>
            <i :class="{
              'el-icon-s-unfold': isCollapse,
              'el-icon-s-fold': !isCollapse
            }"
              class="icon"
              @click="collapse"
            ></i>
            <span>&nbsp;图书管理系统-用户</span>
          </div>
          <el-dropdown v-if="reader">
            <div class="avatar-wrap">
              <img :src="reader.imgsrc" class="avatar">
              <span>{{ reader.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-message">
                <el-button type="text" v-if="this.reader.message === 0" class="message" @click="myMessageBox">我的消息</el-button>
                <el-badge :value="this.reader.message" class="item" v-else>
                  <el-button type="text" class="message" @click="myMessageBox">我的消息</el-button>
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="avatar-wrap" v-else>
            <img src="./unlogin.png" class="avatar" @click="onlogin">
            <span>未登录</span>
          </div>
        </el-header>
        <el-main class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import { getReaderProfile, enterMessageBoxReader } from '@/api/user'

export default {
  name: '',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      reader: null,
      isCollapse: false,
      wid: '200px'
    }
  },
  computed: {},
  watch: {},
  created () {
    try {
      var user = JSON.parse(window.localStorage.getItem('user'))
    } catch (err) {
      user = null
    }
    if (user) {
      if (user.identity === 'admin') {
        this.$router.push('/layout-admin')
      } else {
        this.loadReaderProflie()
      }
    } else {
      this.loadReaderProflie()
    }
  },
  mounted () {},
  methods: {
    loadReaderProflie () {
      getReaderProfile().then(res => {
        this.reader = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    onlogin () {
      this.$router.push('/login')
    },
    collapse () {
      this.isCollapse = !this.isCollapse
      if (this.wid === 'auto') {
        this.wid = '200px'
      } else {
        this.wid = 'auto'
      }
    },
    onLogout () {
      this.$confirm('确认退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    myMessageBox () {
      enterMessageBoxReader().then(res => {
        this.reader.message = 0
        this.$router.push('/layout/reader-message')
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.aside {
  .menu-aside {
    height: 100%;
  }
}
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: white;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }
}
.icon {
  cursor: pointer;
}
.message {
  color:#936266;
  &:hover {
    color: #91b1ff;
  }
}
</style>
