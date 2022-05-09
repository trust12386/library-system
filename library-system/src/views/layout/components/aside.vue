<template>
  <el-menu
    default-active="/layout"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/layout">
      <i class="el-icon-s-home icon"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <div slot="title">
        <i class="el-icon-location icon"></i>
        <span>资源导航</span>
      </div>
        <el-menu-item index="/layout/book">
          <span class="word">图书</span>
        </el-menu-item>
        <el-menu-item index="/layout/magazine">
          <span class="word">杂志</span>
        </el-menu-item>
    </el-submenu>
    <el-menu-item index="/layout/history">
      <i class="el-icon-time icon"></i>
      <span slot="title">浏览历史</span>
    </el-menu-item>
    <el-menu-item index="/layout/borrow">
      <i class="el-icon-document icon"></i>
      <span slot="title">借阅管理</span>
    </el-menu-item>
    <el-menu-item index="/layout/bookshelf">
      <i class="el-icon-reading icon"></i>
      <span slot="title">我的书架</span>
    </el-menu-item>
    <el-menu-item index="/layout/self-setting">
      <i class="el-icon-setting icon"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.icon {
  margin-right: 30px !important;
}
.word {
  padding-left: 45px;
}
</style>
