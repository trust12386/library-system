<template>
  <div class="content">
    <el-card class="card">
      <div slot="header" class="header">
        <el-page-header @back="goBack" content="我的消息"></el-page-header>
        <el-button style="color:#00a1d6" @click="clearAllMessage">清空消息</el-button>
      </div>
      <el-container v-for="(item,index) in message" :key="index" style="margin-bottom:30px;">
        <el-aside width="200px">
          <div class="avatar-wrap">
            <el-image
            class="avatar"
            :src="item.adminImg"></el-image>
          </div>
        </el-aside>
        <el-main style="padding:0 0 25px 0;border-bottom:1px solid rgb(199, 198, 198);">
          <div>
            <span style="font-size:15px;margin:0;font-weight:bold">{{ item.adminName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-weigth:normal;color:#936266;">对我说</span>
          </div>
          <p style="font-size:15px;">{{ item.message }}</p>
          <div style="display: flex;justify-content: space-between;">
            <p style="font-size:15px;color:#936266;margin:0">{{ item.time }}</p>
            <span  @click="deleteMessage(item,index)">
              <i class="el-icon-delete icon">删除</i>
            </span>
          </div>
        </el-main>
      </el-container>
      <div class="text">
        <p v-if="loading">加载中...</p>
        <p v-if="noMore || clear">没有更多了</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMessageReader, clearAllMessageReader, deleteMessageReader } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      message: [],
      form: {
        page: 1,
        perpage: 6
      },
      totalPage: 0,
      loading: false,
      clear: false
    }
  },
  computed: {
    noMore () {
      // 当起始页数大于等于总页数时停止加载
      return this.form.page >= this.totalPage
    }
  },
  watch: {},
  created () {
    this.LoadMessage()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    load () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.LoadMessage() // 调用接口
      }, 500)
    },
    LoadMessage () {
      getMessageReader(this.form).then(res => {
        this.message = [...this.message, ...res.data.data.messageBox]
        this.totalPage = Number(res.data.data.totalPage)
        this.loading = false
      }).catch(() => {})
    },
    handleScroll () {
      const a = document.querySelector('.el-main').scrollHeight - document.querySelector('.el-main').scrollTop <= Math.ceil(document.querySelector('.el-main').clientHeight)
      if (a && !this.noMore) {
        this.load()
      }
    },
    goBack () {
      this.$router.back()
    },
    clearAllMessage () {
      clearAllMessageReader().then(res => {
        this.message = []
        this.clear = true
        this.$forceUpdate()
      })
    },
    async deleteMessage (message, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMore) {
        await getMessageReader(info).then(res => {
          const message = res.data.data.messageBox[0]
          if (message) {
            this.message = [...this.message, message]
          }
          this.totalPage = Number(res.data.data.totalPage)
          this.loading = false
        })
      }
      await deleteMessageReader(message).then(res => {})
      this.message.splice(index, 1)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  justify-content: center;
  .card {
    width: 1000px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.avatar-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.icon {
  color: gray;
  margin-right: 20px;
  &:hover {
    color: #00c;
    cursor: pointer;
    text-decoration: underline;
  };
}
.text {
  display: flex;
  justify-content: center;
}
</style>
