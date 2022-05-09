<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/layout-admin">首页</el-breadcrumb-item>
        <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="main">
        <el-tabs tab-position="left">
          <el-tab-pane>
            <span slot="label" style="font-size:18px" @click="getBookApproval">待审核</span>
            <div class="content">
              <el-card class="card">
                <div slot="header" class="header">
                  <span>待审核</span>
                  <el-button style="color:#00a1d6" @click="clearAllWait">全部撤回</el-button>
                </div>
                <el-container v-for="(item,index) in bookWaitApproval.books" :key="index">
                  <el-aside width="200px" class="aside">
                    <el-image
                        class="image"
                        :src="item.cover.imgurl"
                        fit="fill"></el-image>
                  </el-aside>
                  <el-container>
                    <el-header>
                      <p style="font-size:15px">图书名称:&nbsp;&nbsp;{{ item.name }}</p>
                      <p style="font-size:15px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</span>
                        <span class="icon" @click="deleteWait(item,index)">
                          <i class="el-icon-delete">撤回</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">申请借阅日期:&nbsp;&nbsp;{{ item.value[0] }}&nbsp;至&nbsp;{{ item.value[1] }}</p>
                      <p style="font-size:15px;margin-bottom:20px">发起申请时间:&nbsp;&nbsp;{{ item.time }}</p>
                    </el-main>
                    <el-footer height=30px class="footer"></el-footer>
                  </el-container>
                </el-container>
                <div class="text">
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMoreWait || clearWait">没有更多了</p>
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
                      <p style="font-size:15px">图书名称:&nbsp;&nbsp;{{ item.name }}</p>
                      <p style="font-size:15px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">借阅日期:&nbsp;&nbsp;{{ item.value[0] }}&nbsp;至&nbsp;{{ item.value[1] }}</p>
                      <p style="font-size:15px;margin-bottom:20px">{{ item.message }}</p>
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
                      <p style="font-size:15px">图书名称:&nbsp;&nbsp;{{ item.name }}</p>
                      <p style="font-size:15px">作者:&nbsp;&nbsp;{{ item.author }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</span>
                        <span class="icon" @click="deleteFail(item,index)">
                          <i class="el-icon-delete">删除</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">借阅日期:&nbsp;&nbsp;{{ item.value[0] }}&nbsp;至&nbsp;{{ item.value[1] }}</p>
                      <p style="font-size:15px;margin-bottom:20px">发起申请时间:&nbsp;&nbsp;{{ item.time }}</p>
                      <p style="font-size:15px;margin-bottom:0px" v-if="item.message === ''">未通过原因:&nbsp;&nbsp;无</p>
                      <p style="font-size:15px;margin-bottom:0px" v-else>未通过原因:&nbsp;&nbsp;{{ item.message }}</p>
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
          <el-tab-pane>
            <span slot="label" style="font-size:18px" @click="getBookApproval">已归还</span>
            <div class="content">
              <el-card class="card">
                <div slot="header" class="header">
                  <span>已归还</span>
                  <el-button style="color:#00a1d6" @click="clearAllReturn">清空记录</el-button>
                </div>
                <el-container v-for="(item,index) in returnBook.books" :key="index">
                  <el-aside width="200px" class="aside">
                    <el-image
                        class="image"
                        :src="item.cover.imgurl"
                        fit="fill"></el-image>
                  </el-aside>
                  <el-container>
                    <el-header>
                      <p style="font-size:15px">图书名称:&nbsp;&nbsp;{{ item.name }}</p>
                      <p style="font-size:15px">国际标准书号ISBN:&nbsp;&nbsp;{{ item.isbn }}</p>
                    </el-header>
                    <el-main>
                      <div style="font-size:15px;margin-bottom:20px;margin-top:10px">
                        <span>借阅日期:&nbsp;&nbsp;{{ item.value[0] }}&nbsp;至&nbsp;{{ item.value[1] }}</span>
                        <span class="icon" @click="deleteReturn(item,index)">
                          <i class="el-icon-delete">删除</i>
                        </span>
                      </div>
                      <p style="font-size:15px;margin-bottom:20px">发起申请时间:&nbsp;&nbsp;{{ item.time }}</p>
                      <p style="font-size:15px;margin-bottom:20px">归还日期:&nbsp;&nbsp;{{ item.returnTime }}</p>
                      <p style="font-size:15px;margin-bottom:0px">操作人员:&nbsp;&nbsp;{{ item.adminName}}&nbsp;&nbsp;&nbsp;&nbsp;操作人员账号:&nbsp;&nbsp;{{ item.adminAccount}}</p>
                    </el-main>
                    <el-footer height=30px class="footer"></el-footer>
                  </el-container>
                </el-container>
                <div class="text">
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMoreReturn || clearReturn">没有更多了</p>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getBookApprovalListReader, deleteAllWaitBookApprovalReader, deleteAllFailBookApprovalReader, deleteWaitBookApprovalReader, deleteFailBookApprovalReader, deleteReturnBookReader, deleteAllReturnBookReader } from '@/api/book'
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
      bookWaitApproval: {
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
      returnBook: {
        books: [],
        totalPage: 0
      },
      book: [],
      loading: false,
      clearWait: false,
      clearPass: false,
      clearFail: false,
      clearReturn: false
    }
  },
  computed: {
    noMoreWait () {
      // 当起始页数大于等于总页数时停止加载
      return this.form.page >= this.bookWaitApproval.totalPage
    },
    noMorePass () {
      return this.form.page >= this.bookPassApproval.totalPage
    },
    noMoreFail () {
      return this.form.page >= this.bookFailApproval.totalPage
    },
    noMoreReturn () {
      return this.form.page >= this.returnBook.totalPage
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
    getBookApproval () {
      this.form.page = 1
      getBookApprovalListReader(this.form).then(res => {
        console.log(res)
        this.bookWaitApproval.books = res.data.data.waitBooks
        this.bookWaitApproval.totalPage = res.data.data.waitPage
        this.bookPassApproval.books = res.data.data.passBooks
        this.bookPassApproval.totalPage = res.data.data.passPage
        this.bookFailApproval.books = res.data.data.failBooks
        this.bookFailApproval.totalPage = res.data.data.failPage
        this.returnBook.books = res.data.data.returnBooks
        this.returnBook.totalPage = res.data.data.returnPage
        for (const item of this.bookPassApproval.books) {
          const time = new Date()
          const start = time.toLocaleDateString().replace(/\//g, '-').split('-')
          const end = item.value[1].split('-')
          const Date1 = new Date(start[0], start[1], start[2])
          const Date2 = new Date(end[0], end[1], end[2])
          const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
          item.message = `距离还书日期还剩 ${date} 天`
        }
        for (const item of this.returnBook.books) {
          console.log(item)
          const arr = item.message.split('/')
          item.returnTime = arr[0]
          item.adminName = arr[1]
          item.adminAccount = arr[2]
        }
      })
    },
    loadWait () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadWaitBookApproval() // 调用接口
      }, 500)
    },
    loadWaitBookApproval () {
      getBookApprovalListReader(this.form).then(res => {
        this.bookWaitApproval.books = [...this.bookWaitApproval.books, ...res.data.data.waitBooks]
        this.bookWaitApproval.totalPage = Number(res.data.data.waitPage)
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
      getBookApprovalListReader(this.form).then(res => {
        this.bookPassApproval.books = [...this.bookPassApproval.books, ...res.data.data.passBooks]
        this.bookPassApproval.totalPage = Number(res.data.data.passPage)
        for (const item of this.bookPassApproval.books) {
          const time = new Date()
          const start = time.toLocaleDateString().replace(/\//g, '-').split('-')
          const end = item.value[1].split('-')
          const Date1 = new Date(start[0], start[1], start[2])
          const Date2 = new Date(end[0], end[1], end[2])
          const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
          item.message = `距离还书日期还剩 ${date} 天`
        }
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
      getBookApprovalListReader(this.form).then(res => {
        this.bookFailApproval.books = [...this.bookFailApproval.books, ...res.data.data.failBooks]
        this.bookFailApproval.totalPage = Number(res.data.data.failPage)
        this.loading = false
      }).catch(() => {})
    },
    loadReturn () {
      // 滑到底部时进行加载
      this.loading = true
      setTimeout(() => {
        this.form.page += 1 // 滚动条到底时，页码自增 1
        this.loadReturnBook() // 调用接口
      }, 500)
    },
    loadReturnBook () {
      getBookApprovalListReader(this.form).then(res => {
        this.returnBook.books = [...this.returnBook.books, ...res.data.data.returnBooks]
        this.returnBook.totalPage = Number(res.data.data.returnPage)
        this.loading = false
      }).catch(() => {})
    },
    handleScroll () {
      const a = document.querySelector('.el-main').scrollHeight - document.querySelector('.el-main').scrollTop <= Math.ceil(document.querySelector('.el-main').clientHeight)
      if (a && !this.noMoreWait) {
        this.loadWait()
      }
      if (a && !this.noMorePass) {
        this.loadPass()
      }
      if (a && !this.noMoreFail) {
        this.loadFail()
      }
      if (a && !this.noMoreReturn) {
        this.loadReturn()
      }
    },
    clearAllWait () {
      deleteAllWaitBookApprovalReader().then(res => {
        this.bookWaitApproval.books = []
        this.clearWait = true
        this.$forceUpdate()
      })
    },
    clearAllFail () {
      deleteAllFailBookApprovalReader().then(res => {
        this.bookFailApproval.books = []
        this.clearFail = true
        this.$forceUpdate()
      })
    },
    clearAllReturn () {
      deleteAllReturnBookReader().then(res => {
        this.returnBook.books = []
        this.clearReturn = true
        this.$forceUpdate()
      })
    },
    async deleteWait (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMoreWait) {
        await getBookApprovalListReader(info).then(res => {
          const book = res.data.data.waitBooks[0]
          if (book) {
            this.bookWaitApproval.books = [...this.bookWaitApproval.books, book]
          }
          this.bookWaitApproval.totalPage = Number(res.data.data.waitsPage)
          this.loading = false
        })
      }
      await deleteWaitBookApprovalReader(book).then(res => {})
      this.bookWaitApproval.books.splice(index, 1)
      this.$forceUpdate()
    },
    async deleteFail (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMoreFail) {
        await getBookApprovalListReader(info).then(res => {
          const book = res.data.data.failBooks[0]
          if (book) {
            this.bookFailApproval.books = [...this.bookFailApproval.books, book]
          }
          this.bookFailApproval.totalPage = Number(res.data.data.failPage)
          this.loading = false
        })
      }
      await deleteFailBookApprovalReader(book).then(res => {})
      this.bookFailApproval.books.splice(index, 1)
      this.$forceUpdate()
    },
    async deleteReturn (book, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMoreReturn) {
        await getBookApprovalListReader(info).then(res => {
          const book = res.data.data.returnBooks[0]
          if (book) {
            this.returnBook.books = [...this.returnBook.books, book]
          }
          this.returnBook.totalPage = Number(res.data.data.returnPage)
          this.loading = false
        })
      }
      await deleteReturnBookReader(book).then(res => {})
      this.returnBook.books.splice(index, 1)
      this.$forceUpdate()
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
