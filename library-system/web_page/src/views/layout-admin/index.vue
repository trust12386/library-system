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
            <span>&nbsp;图书管理系统-管理员</span>
          </div>
          <el-dropdown v-if="admin">
            <div class="avatar-wrap">
              <img :src="admin.imgsrc" class="avatar">
              <span>{{ admin.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-message">我的消息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="avatar-wrap" v-else>
            <img src="./unlogin.png" class="avatar" @click="onlogin">
            <span>未登录</span>
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </div>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import { getAdminProfile } from '@/api/user'

export default {
  name: 'Layout-Admin',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      admin: null,
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
      if (user.identity === 'reader') {
        this.$router.push('/')
      } else {
        this.loadAdminProflie()
      }
    } else {
      this.loadAdminProflie()
    }
  },
  mounted () {},
  methods: {
    loadAdminProflie () {
      getAdminProfile().then(res => {
        this.admin = res.data.data
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
          message: '已取消删除'
        })
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
</style>
