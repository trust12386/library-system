<template>
  <div class="content">
    <el-card class="card">
      <el-page-header @back="goBack" content="借阅详情" style="padding-bottom:20px;border-bottom:1px solid grey"></el-page-header>
      <div v-for="(item,index) in books" :key="index" class="item">
        <el-container>
          <el-aside width="200px" class="aside">
            <el-image
                class="image"
                :src="item.cover.imgurl"
                fit="fill"></el-image>
          </el-aside>
          <el-container>
            <el-main class="item-main">
              <p style="font-size:20px;margin:0">{{ item.name }}</p>
              <p style="font-size:18px">作者:&nbsp;&nbsp;{{ item.author }}</p>
              <p style="font-size:18px;margin-bottom:20px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
              <p style="font-size:18px;margin-bottom:20px">借阅时间:&nbsp;&nbsp;{{ item.value[0] }}&nbsp;至&nbsp;{{ item.value[1] }}</p>
              <div style="display:flex;justify-content:space-between">
                <p style="font-size:18px;margin:0;color:red">{{ item.message }}</p>
                <div>
                  <i class="el-icon-tickets icon" v-if="item.isBorrow === '2'" @click="returnBook(item)">归还</i>
                  <i class="el-icon-tickets icon" v-if="item.isBorrow === '4'">已归还</i>
                  <i class="el-icon-tickets icon" @click="Remind(item)">提醒Ta</i>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>
      <div class="text">
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        append-to-body
        width="30%">
        <span style="font-size:20px">&nbsp;&nbsp;&nbsp;&nbsp;确定归还此书吗？</span>
        <span slot="footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit1">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        append-to-body
        width="30%">
        <div style="display:flex;justify-content:space-between;margin-bottom:20px">
          <p style="font-size:20px;margin:0">有什么想对ta说的:</p>
          <el-button round @click="quickMessage">到期提醒</el-button>
        </div>
        <el-input
          type="textarea"
          style="font-size:20px"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <span slot="footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit2">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getReaderPassBookListAdmin, returnBookAdmin } from '@/api/book'
import { sendMessageAdmin } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        account: '',
        page: 1,
        perpage: 4
      },
      books: [],
      total: 0,
      loading: false,
      dialogVisible1: false,
      dialogVisible2: false,
      textarea: '',
      book: []
    }
  },
  computed: {
    noMore () {
      // 当起始页数大于等于总页数时停止加载
      return this.form.page >= this.total
    }
  },
  watch: {},
  created () {
    this.LoadBorrowBookList()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    LoadBorrowBookList () {
      this.form.account = JSON.parse(this.$route.query.account)
      getReaderPassBookListAdmin(this.form).then(res => {
        console.log(res)
        this.books = res.data.data.books
        this.total = res.data.data.total
        for (const item of this.books) {
          item.cover = JSON.parse(item.cover)
          const time = new Date()
          const start = time.toLocaleDateString().replace(/\//g, '-').split('-')
          const end = item.value[1].split('-')
          const Date1 = new Date(start[0], start[1], start[2])
          const Date2 = new Date(end[0], end[1], end[2])
          const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
          item.message = `距离还书日期还剩 ${date} 天`
        }
        console.log(this.books)
      })
    },
    goBack () {
      this.$router.back()
    },
    load () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadBookBorrow() // 调用接口
      }, 500)
    },
    loadBookBorrow () {
      getReaderPassBookListAdmin(this.form).then(res => {
        const books = res.data.data.books
        for (const item of books) {
          item.cover = JSON.parse(item.cover)
          const time = new Date()
          const start = time.toLocaleDateString().replace(/\//g, '-').split('-')
          const end = item.value[1].split('-')
          const Date1 = new Date(start[0], start[1], start[2])
          const Date2 = new Date(end[0], end[1], end[2])
          const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
          item.message = `距离还书日期还剩 ${date} 天`
        }
        this.books = [...this.books, ...books]
        this.total = Number(res.data.data.total)
        this.loading = false
      }).catch(() => {})
    },
    handleScroll () {
      const a = document.querySelector('.el-main').scrollHeight - document.querySelector('.el-main').scrollTop <= Math.ceil(document.querySelector('.el-main').clientHeight)
      if (a && !this.noMore) {
        this.load()
      }
    },
    returnBook (book) {
      this.dialogVisible1 = true
      this.book = book
    },
    Remind (book) {
      this.textarea = ''
      this.book = book
      console.log(this.book)
      this.dialogVisible2 = true
    },
    getTime () {
      const time = new Date()
      const time1 = time.toLocaleDateString().replace(/\//g, '-')
      let h = time.getHours()
      let m = time.getMinutes()
      let s = time.getSeconds()
      if (h < 10) { h = '0' + h }
      if (m < 10) { m = '0' + m }
      if (s < 10) { s = '0' + s }
      const time2 = h + ':' + m + ':' + s
      const timeStr = time1 + ' ' + time2
      return timeStr
    },
    onSubmit1 () {
      this.book.returnTime = this.getTime()
      returnBookAdmin(this.book).then(res => {
        this.book.isBorrow = '4'
        this.dialogVisible1 = false
      })
    },
    onSubmit2 () {
      if (this.textarea === '') {
        return this.$message({
          type: 'warning',
          message: '请填写要发送的消息'
        })
      }
      const form = {
        message: this.textarea,
        account: this.book.account,
        time: this.getTime()
      }
      sendMessageAdmin(form).then(res => {
        this.$message({
          type: 'success',
          message: '消息发送成功'
        })
        this.dialogVisible2 = false
      })
    },
    quickMessage () {
      this.textarea = `您借阅的图书《${this.book.name}》即将于${this.book.value[1]}到期，请及时归还图书！`
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
  }
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
.item-main {
  border-bottom:1px solid rgb(199, 198, 198);
  padding-bottom: 0;
}
.icon {
  margin-left: 20px;
  font-size:18px;
  color: #00c;
  &:hover {
    color: red;
    cursor: pointer;
    text-decoration: underline;
  };
}
.text {
  display: flex;
  justify-content: center;
}
</style>
