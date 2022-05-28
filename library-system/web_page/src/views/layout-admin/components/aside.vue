<template>
  <el-menu
    default-active="/layout-admin"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/layout-admin">
      <i class="el-icon-s-home icon"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <div slot="title">
        <i class="el-icon-location icon"></i>
        <span>资源管理</span>
      </div>
        <el-menu-item index="/layout-admin/book-manage">
          <span class="word">图书</span>
        </el-menu-item>
        <el-menu-item index="/layout-admin/magazine-manage">
          <span class="word">杂志</span>
        </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <div slot="title">
        <i class="el-icon-location icon"></i>
        <span>资源发布</span>
      </div>
        <el-menu-item index="/layout-admin/book-publish">
          <span class="word">图书</span>
        </el-menu-item>
        <el-menu-item index="/layout-admin/magazine-publish">
          <span class="word">杂志</span>
        </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <div slot="title">
        <i class="el-icon-location icon"></i>
        <span>借阅审批</span>
      </div>
        <el-menu-item index="/layout-admin/book-approval">
          <span style="padding-left: 34px;">图书审批</span>
        </el-menu-item>
        <el-menu-item index="/layout-admin/magazine-approval">
          <span style="padding-left: 34px;">杂志审批</span>
        </el-menu-item>
    </el-submenu>
    <el-menu-item index="/layout-admin/reader-manage">
      <i class="el-icon-reading icon"></i>
      <span slot="title">读者管理</span>
    </el-menu-item>
    <el-menu-item index="/layout-admin/self-setting">
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
