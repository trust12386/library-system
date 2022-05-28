<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/layout-admin">首页</el-breadcrumb-item>
        <el-breadcrumb-item>借阅审批</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="main">
        <el-tabs tab-position="left">
          <el-tab-pane>
            <span slot="label" style="font-size:18px" @click="getBookApproval">未审核</span>
            <div class="content">
              <el-card class="card">
                <div slot="header" class="header">
                  <span>未审核</span>
                </div>
                <el-container v-for="(item,index) in bookApproval.books" :key="index">
                  <el-aside width="200px" class="aside">
                    <el-image
                        class="image"
                        :src="item.cover.imgurl"
                        fit="fill"></el-image>
                  </el-aside>
                  <el-container>
                    <el-header>
                      <p style="font-size:15px">申请人:&nbsp;&nbsp;{{ item.readerName }}</p>
                      <p style="font-size:15px">申请人账号:&nbsp;&nbsp;{{ item.account }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>图书名称:&nbsp;&nbsp;{{ item.name }}</span>
                        <span class="icon">
                          <i class="el-icon-tickets" @click="Approval(item)" v-if="item.isBorrow === '1'">审批</i>
                          <i class="el-icon-tickets" @click="Approval(item)" v-if="item.isBorrow === '0'">已审批</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                      <p style="font-size:15px;margin-bottom:20px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
                    </el-main>
                    <el-footer height=30px class="footer"></el-footer>
                  </el-container>
                </el-container>
                <div class="text">
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMore">没有更多了</p>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" style="font-size:18px" @click="getBookApproval">已通过</span>
            <div class="content">
              <el-card class="card">
                <div slot="header" class="header">
                  <span>已通过</span>
                  <el-button style="color:#00a1d6" @click="clearAllPass">清空记录</el-button>
                </div>
                <el-container v-for="(item,index) in bookPassApproval.books" :key="index">
                  <el-aside width="200px" class="aside">
                    <el-image
                        class="image"
                        :src="item.cover.imgurl"
                        fit="fill"></el-image>
                  </el-aside>
                  <el-container>
                    <el-header>
                      <p style="font-size:15px">申请人:&nbsp;&nbsp;{{ item.readerName }}</p>
                      <p style="font-size:15px">申请人账号:&nbsp;&nbsp;{{ item.account }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>图书名称:&nbsp;&nbsp;{{ item.name }}</span>
                        <span class="icon" @click="deletePass(item,index)">
                          <i class="el-icon-delete">删除</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                      <p style="font-size:15px;margin-bottom:20px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
                    </el-main>
                    <el-footer height=30px class="footer"></el-footer>
                  </el-container>
                </el-container>
                <div class="text">
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMorePass || clearPass">没有更多了</p>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" style="font-size:18px" @click="getBookApproval">未通过</span>
            <div class="content">
              <el-card class="card">
                <div slot="header" class="header">
                  <span>未通过</span>
                  <el-button style="color:#00a1d6" @click="clearAllFail">清空记录</el-button>
                </div>
                <el-container v-for="(item,index) in bookFailApproval.books" :key="index">
                  <el-aside width="200px" class="aside">
                    <el-image
                        class="image"
                        :src="item.cover.imgurl"
                        fit="fill"></el-image>
                  </el-aside>
                  <el-container>
                    <el-header>
                      <p style="font-size:15px">申请人:&nbsp;&nbsp;{{ item.readerName }}</p>
                      <p style="font-size:15px">申请人账号:&nbsp;&nbsp;{{ item.account }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>图书名称:&nbsp;&nbsp;{{ item.name }}</span>
                        <span class="icon" @click="deleteFail(item,index)">
                          <i class="el-icon-delete">删除</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                      <p style="font-size:15px;margin-bottom:20px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
                    </el-main>
                    <el-footer height=30px class="footer"></el-footer>
                  </el-container>
                </el-container>
                <div class="text">
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMoreFail || clearFail">没有更多了</p>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-dialog
      v-if="dialogVisible"
      title="图书借阅"
      :visible.sync="dialogVisible"
      append-to-body
      width="40%">
      <div class="dialogHeader">
        <div style="padding-left:20px">
          <div>
            <p style="font-size:22px;margin-top:0">借阅人:&nbsp;&nbsp;{{ book.readerName }}</p>
            <p style="font-size:22px">借阅人账号:&nbsp;&nbsp;{{ book.account }}</p>
            <p style="font-size:22px">作者:&nbsp;&nbsp;{{ book.author }}</p>
            <p style="font-size:22px">国际标准书号ISBN:&nbsp;&nbsp;{{ book.isbn }}</p>
            <p style="font-size:22px">借阅日期:&nbsp;&nbsp;{{ book.value[0] }}&nbsp;至&nbsp;{{ book.value[1] }}</p>
            <p style="font-size:22px">借阅天数:&nbsp;&nbsp;{{ book.date }}</p>
          </div>
          <div>
            <span style="font-size:22px">是否允许借阅&nbsp;&nbsp;</span>
            <el-select v-model="result" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-if="result === '1'">
            <p style="font-size:22px;margin-top:10px;margin-bottom:10px">拒绝的原因:&nbsp;&nbsp;</p>
            <el-input
             style="font-size:18px;"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="message">
            </el-input>
          </div>
        </div>
        <div class="borrowAside">
          <el-image
            class="image"
            :src="book.cover.imgurl"
            fit="fill"></el-image>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" round>取 消</el-button>
        <el-button type="primary" round @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBookApprovalList, bookAlreadyApproval, addBookApprovalAdmin, getBookApprovalListAdmin, deleteAllPassBookApprovalAdmin, deleteAllFailBookApprovalAdmin, deleteBookApprovalAdmin } from '@/api/book'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        page: 1,
        perpage: 4
      },
      bookApproval: {
        books: [],
        totalPage: 0
      },
      bookPassApproval: {
        books: [],
        totalPage: 0
      },
      bookFailApproval: {
        books: [],
        totalPage: 0
      },
      options: [{
        value: '0',
        label: '允许借阅'
      }, {
        value: '1',
        label: '拒绝借阅'
      }],
      book: [],
      loading: false,
      dialogVisible: false,
      result: undefined,
      message: '',
      clearPass: false,
      clearFail: false
    }
  },
  computed: {
    noMore () {
      // 当起始页数大于等于总页数时停止加载
      return this.form.page >= this.bookApproval.totalPage
    },
    noMorePass () {
      return this.form.page >= this.bookPassApproval.totalPage
    },
    noMoreFail () {
      return this.form.page >= this.bookFailApproval.totalPage
    }
  },
  watch: {},
  created () {
    this.getBookApproval()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    async getBookApproval () {
      this.form.page = 1
      await getBookApprovalList(this.form).then(res => {
        this.bookApproval.books = res.data.data.books
        this.bookApproval.totalPage = res.data.data.totalPage
      })
      await getBookApprovalListAdmin(this.form).then(res => {
        this.bookPassApproval.books = res.data.data.passBooks
        this.bookPassApproval.totalPage = res.data.data.passPage
        this.bookFailApproval.books = res.data.data.failBooks
        this.bookFailApproval.totalPage = res.data.data.failPage
      })
    },
    load () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadBookApproval() // 调用接口
      }, 500)
    },
    loadBookApproval () {
      getBookApprovalList(this.form).then(res => {
        this.bookApproval.books = [...this.bookApproval.books, ...res.data.data.books]
        this.bookApproval.totalPage = Number(res.data.data.totalPage)
        this.loading = false
      }).catch(() => {})
    },
    loadPass () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadPassBookApproval() // 调用接口
      }, 500)
    },
    loadPassBookApproval () {
      getBookApprovalListAdmin(this.form).then(res => {
        this.bookPassApproval.books = [...this.bookPassApproval.books, ...res.data.data.passBooks]
        this.bookPassApproval.totalPage = Number(res.data.data.passPage)
        this.loading = false
      }).catch(() => {})
    },
    loadFail () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadFailBookApproval() // 调用接口
      }, 500)
    },
    loadFailBookApproval () {
      getBookApprovalListAdmin(this.form).then(res => {
        this.bookFailApproval.books = [...this.bookFailApproval.books, ...res.data.data.failBooks]
        this.bookFailApproval.totalPage = Number(res.data.data.failPage)
        this.loading = false
      }).catch(() => {})
    },
    handleScroll () {
      const a = document.querySelector('.el-main').scrollHeight - document.querySelector('.el-main').scrollTop <= Math.ceil(document.querySelector('.el-main').clientHeight)
      if (a && !this.noMore) {
        this.load()
      }
      if (a && !this.noMorePass) {
        this.loadPass()
      }
      if (a && !this.noMoreFail) {
        this.loadFail()
      }
    },
    clearAllPass () {
      deleteAllPassBookApprovalAdmin().then(res => {
        this.bookPassApproval.books = []
        this.clearPass = true
        this.$forceUpdate()
      })
    },
    clearAllFail () {
      deleteAllFailBookApprovalAdmin().then(res => {
        this.bookFailApproval.books = []
        this.clearFail = true
        this.$forceUpdate()
      })
    },
    async deletePass (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMorePass) {
        await getBookApprovalListAdmin(info).then(res => {
          const book = res.data.data.passBooks[0]
          if (book) {
            this.bookPassApproval.books = [...this.bookPassApproval.books, book]
          }
          this.bookPassApproval.totalPage = Number(res.data.data.passPage)
          this.loading = false
        })
      }
      await deleteBookApprovalAdmin(book).then(res => {})
      this.bookPassApproval.books.splice(index, 1)
      this.$forceUpdate()
    },
    async deleteFail (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMoreFail) {
        await getBookApprovalListAdmin(info).then(res => {
          const book = res.data.data.failBooks[0]
          if (book) {
            this.bookFailApproval.books = [...this.bookFailApproval.books, book]
          }
          this.bookFailApproval.totalPage = Number(res.data.data.failPage)
          this.loading = false
        })
      }
      await deleteBookApprovalAdmin(book).then(res => {})
      this.bookFailApproval.books.splice(index, 1)
      this.$forceUpdate()
    },
    Approval (book) {
      this.book = book
      this.result = undefined
      this.message = ''
      this.dialogVisible = true
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
    async onSubmit () {
      if (!this.result) {
        return this.$message({
          message: '请选择是否允许借阅！',
          type: 'warning'
        })
      }
      const form = {
        account: this.book.account,
        isbn: this.book.isbn,
        result: this.result,
        message: this.message,
        time: this.getTime()
      }
      const book = this.book
      book.result = this.result
      book.message = this.message
      book.time = this.getTime()
      await bookAlreadyApproval(form).then(res => {})
      await addBookApprovalAdmin(book).then(res => {
        for (const item of this.bookApproval.books) {
          if (item.isbn === this.book.isbn && item.account === this.book.account) {
            item.isBorrow = '0'
            break
          }
        }
        this.$forceUpdate()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
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
  color: #00c;
  &:hover {
    color: red;
    cursor: pointer;
  };
}
.footer {
  border-top: 1px solid gray;
}
.dialogHeader {
  display: flex;
  justify-content: space-between;
  .borrowAside {
    width: 220px;
    height: 300px;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 50px;
    .image {
      width: 180px;
      height: 240px;
      margin: 20px 0;
    }
  }
}
</style>
