<template>
  <div class="content">
    <el-card class="card">
      <div slot="header" class="header">
        <el-page-header @back="goBack" content="历史详情"></el-page-header>
        <el-button style="color:#00a1d6" @click="clearAll">清空历史</el-button>
      </div>
      <el-container v-for="(item,index) in bookHistory" :key="index">
        <el-aside width="200px" class="aside">
          <el-image
              class="image"
              :src="item.cover.imgurl"
              fit="fill"></el-image>
        </el-aside>
        <el-container>
          <el-header>
            <el-link style="font-size:20px">{{ item.name }}</el-link>
            <p style="font-size:15px">作者:&nbsp;&nbsp;{{ item.author }}</p>
          </el-header>
          <el-main>
            <div style="margin-bottom:25px">
              <span style="font-size:15px;margin-top:0;">出版日期:&nbsp;&nbsp;{{ item.pubdate }}</span>
              <span class="icon" @click="deleteBook(item,index)">
                <i class="el-icon-delete">删除</i>
              </span>
            </div>
            <p style="font-size:15px;margin-bottom:25px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
            <p style="font-size:15px;margin-bottom:0">图书状态:&nbsp;&nbsp;
              <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
              <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
              <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
            </p>
          </el-main>
          <el-footer height=30px class="footer"></el-footer>
        </el-container>
      </el-container>
      <div class="text">
        <p v-if="loading">加载中...</p>
        <p v-if="noMore || clear">没有更多了</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getBookDetailHistoryReader, deleteBookHistoryReader, deleteAllBookHistoryReader } from '@/api/book'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      bookHistory: [],
      form: {
        page: 1,
        perpage: 4
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
    this.loadBookHistory()
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
        this.loadBookHistory() // 调用接口
      }, 500)
    },
    loadBookHistory () {
      getBookDetailHistoryReader(this.form).then(res => {
        this.bookHistory = [...this.bookHistory, ...res.data.data.books]
        this.totalPage = Number(res.data.data.totalPage)
        this.loading = false
      }).catch(() => {})
    },
    goBack () {
      this.$router.back()
    },
    handleScroll () {
      const a = document.querySelector('.el-main').scrollHeight - document.querySelector('.el-main').scrollTop <= Math.ceil(document.querySelector('.el-main').clientHeight)
      if (a && !this.noMore) {
        this.load()
      }
    },
    clearAll () {
      deleteAllBookHistoryReader().then(res => {
        this.bookHistory = []
        this.clear = true
        this.$forceUpdate()
      })
    },
    async deleteBook (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMore) {
        await getBookDetailHistoryReader(info).then(res => {
          const book = res.data.data.books[0]
          if (book) {
            this.bookHistory = [...this.bookHistory, book]
          }
          this.totalPage = Number(res.data.data.totalPage)
          this.loading = false
        })
      }
      await deleteBookHistoryReader(book).then(res => {})
      this.bookHistory.splice(index, 1)
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
.text {
  display: flex;
  justify-content: center;
}
.aside {
  display: flex;
  align-items: center;
  justify-content: center;
  .image {
    width: 150px;
    height: 200px;
    margin: 20px 0;
  }
}
.icon {
  float: right;
  color: gray;
  &:hover {
    color: #00c;
    cursor: pointer;
  };
}
.footer {
  border-top: 1px solid gray;
}
</style>
