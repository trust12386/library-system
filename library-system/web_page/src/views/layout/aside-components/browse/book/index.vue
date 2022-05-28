<template>
  <div>
    <el-card class="header-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资源导航</el-breadcrumb-item>
        <el-breadcrumb-item>图书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="book-form" :model="form" label-width="80px">
        <el-form-item label="图书分类">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="0" name="type">人文社科</el-checkbox>
            <el-checkbox label="1" name="type">自然科学</el-checkbox>
            <el-checkbox label="2" name="type">文学艺术</el-checkbox>
            <el-checkbox label="3" name="type">财经生活</el-checkbox>
            <el-checkbox label="4" name="type">少儿图书</el-checkbox>
            <el-checkbox label="5" name="type">名人名著</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="图书状态">
          <el-checkbox-group v-model="form.status">
            <el-checkbox label="0" name="status">在借</el-checkbox>
            <el-checkbox label="1" name="status">在馆</el-checkbox>
            <el-checkbox label="2" name="status">下架</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onScreen">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="content-card">
      <div slot="header" class="clearfix">
        根据筛选条件共筛选出{{ total }}条结果:
        <el-row>
          <span>每页显示:</span>
            <el-select v-model="form.perpage" placeholder="请选择" class="perpage" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <span>条</span>
        </el-row>
      </div>
      <!--使用Vue的v-for方法遍历图书列表 -->
      <el-container v-for="(item,index) in books" :key="index" class="content">
        <el-aside width="400px" class="aside">
          <el-image
            class="image"
            :src="item.cover.imgurl"
            fit="fill"></el-image>
        </el-aside>
        <el-container class="container">
          <el-header height="20px">
            <el-link class="title" @click="viewDetails(item)">{{ item.name }}</el-link>
          </el-header>
          <el-main>
            <el-descriptions class="table" title="" :column="2" size="medium" style="width:1020px">
              <el-descriptions-item label="作者">
                <!-- 模板编译，预渲染到虚拟DOM -->
                <span>{{ item.author }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="ISBN">
                {{ item.isbn }}
              </el-descriptions-item>
              <el-descriptions-item label="发布日期">
                {{ item.pubdate }}
              </el-descriptions-item>
              <el-descriptions-item label="图书状态">
                <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <div class="type">
              图书类别:
              <el-tag v-if="item.classify.includes('0') === true" effect="dark" class="tag" >人文社科</el-tag>
              <el-tag type="success" v-if="item.classify.includes('1') === true" effect="dark" class="tag">自然科学</el-tag>
              <el-tag type="info" v-if="item.classify.includes('2') === true" effect="dark" class="tag">文学艺术</el-tag>
              <el-tag type="warning" v-if="item.classify.includes('3') === true" effect="dark" class="tag">财经生活</el-tag>
              <el-tag type="danger" v-if="item.classify.includes('4') === true" effect="dark" class="tag">少儿图书</el-tag>
              <el-tag v-if="item.classify.includes('5') === true" class="tag" effect="dark">名人名著</el-tag>
            </div>
            <el-row :gutter="5">
              <el-col :span="1">
                <span>简介:</span>
              </el-col>
              <el-col :span="19">
                <span class="introdution">{{ item.introdution }}</span>
              </el-col>
            </el-row>
          </el-main>
          <el-col :span="20">
            <el-footer class="footer" height="40px">
              <i class="el-icon-star-on word" @click="removeCollection(item)" v-if="item.isCollection === true">已收藏</i>
              <i class="el-icon-star-off word" @click="addCollection(item)" v-else>收藏</i>
              <i class="el-icon-collection word" v-if="item.isBorrow === '1'">审核中</i>
              <i class="el-icon-collection word" v-if="item.isBorrow === '2'">已借阅</i>
              <i class="el-icon-collection word" @click="Borrow(item)" v-if="item.isBorrow === '0' || item.isBorrow === '3'">借阅</i>
            </el-footer>
          </el-col>
        </el-container>
      </el-container>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="form.page"
        :page-size="form.perpage"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
            <p style="font-size:24px;margin-top:0">书名:&nbsp;&nbsp;{{ book.name }}</p>
            <p style="font-size:24px">作者:&nbsp;&nbsp;{{ book.author }}</p>
            <p style="font-size:24px">国际标准书号ISBN:&nbsp;&nbsp;{{ book.isbn }}</p>
          </div>
          <div>
            <span style="font-size:24px;margin-top:5px;margin-bottom:20px">借阅日期:</span>
            <div style="margin-top:10px">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
            </div>
          </div>
          <p style="font-size:24px">借阅天数: <span v-if="value">{{ date }}</span></p>
        </div>
        <div class="borrowAside">
          <el-image
            class="image"
            :src="book.cover.imgurl"
            fit="fill"></el-image>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { screenBook, screenBookReader, addBookHistoryReader, addBookCollectionReader, removeBookCollectionReader, addBookBorrow } from '@/api/book'
export default {
  name: 'Book',
  components: {},
  props: {},
  data () {
    return {
      form: {
        type: [],
        status: [],
        page: 1,
        perpage: 10
      },
      options: [
        {
          value: 5,
          label: '5'
        },
        {
          value: 10,
          label: '10'
        },
        {
          value: 15,
          label: '15'
        },
        {
          value: 20,
          label: '20'
        }
      ],
      books: [],
      total: 0,
      scroll: 0,
      dialogVisible: false,
      book: [],
      pickerOptions: {
        disabledDate (time) {
          return (time.getTime() < (Date.now() - 3600 * 1000 * 24 * 1)) || (time.getTime() > (Date.now() + 3600 * 1000 * 24 * 30))
        },
        shortcuts: [{
          text: '一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '两周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 14)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: undefined
    }
  },
  computed: {
    date () {
      const start = this.value[0].split('-')
      const end = this.value[1].split('-')
      const Date1 = new Date(start[0], start[1], start[2])
      const Date2 = new Date(end[0], end[1], end[2])
      const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
      return date
    }
  },
  watch: {},
  created () {
    this.loadBook()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.loadBook()
    if (this.scroll > 0) {
      document.querySelector('.el-main').scrollTo(0, this.scroll)
      this.scroll = 0
    }
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    Screenbook (book) {
      screenBookReader(book).then(res => {
        this.books = res.data.data.books
        this.total = res.data.data.total
        // 判断要渲染列表中的图书是否在用户的收藏列表中
        // 如果返回的收藏列表为空
        if (res.data.data.collection.length === 0) {
          for (const item of this.books) {
            item.isCollection = false
          }
        } else {
          // 把收藏列表中的书与要显示的书的isbn进行对比
          for (const item of this.books) {
            for (const tip of res.data.data.collection) {
              if (item.isbn === tip.isbn) {
                item.isCollection = true
                break
              } else {
                item.isCollection = false
              }
            }
          }
        }
        // 判断要渲染列表中的图书是否在用户的借阅列表中
        if (res.data.data.borrow.length === 0) {
          for (const item of this.books) {
            item.isBorrow = '0'
          }
        } else {
          for (const item of this.books) {
            for (const tip of res.data.data.borrow) {
              if (item.isbn === tip.isbn && tip.isBorrow === '1') {
                item.isBorrow = '1'
                break
              } else if (item.isbn === tip.isbn && tip.isBorrow === '2') {
                item.isBorrow = '2'
                break
              } else if (item.isbn === tip.isbn && tip.isBorrow === '3') {
                item.isBorrow = '3'
                break
              } else {
                item.isBorrow = '0'
              }
            }
          }
        }
        console.log(this.books)
      }).catch(err => {
        if (err) {
          screenBook(book).then(res => {
            this.books = res.data.data.books
            this.total = res.data.data.total
          })
        }
      })
    },
    loadBook () {
      this.Screenbook(this.form)
    },
    onScreen () {
      this.Screenbook(this.form)
    },
    resetForm () {
      this.form.type = []
      this.form.status = []
    },
    selectChange () {
      this.Screenbook(this.form)
    },
    handleCurrentChange () {
      document.querySelector('.el-main').scrollTo(0, 0)
      this.Screenbook(this.form)
    },
    viewDetails (book) {
      addBookHistoryReader(book).then(res => {
      })
      this.$router.push({
        path: '/layout/book-detail',
        query: {
          book: JSON.stringify(book)
        }
      })
    },
    // 添加收藏
    addCollection (book) {
      addBookCollectionReader(book).then(res => {
        book.isCollection = true
        this.$forceUpdate()
      })
    },
    removeCollection (book) {
      removeBookCollectionReader(book).then(res => {
        book.isCollection = false
        this.$forceUpdate()
      })
    },
    handleScroll () {
      this.scroll = document.querySelector('.el-main').scrollTop
    },
    Borrow (book) {
      this.book = book
      this.value = undefined
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
    onSubmit () {
      if (!this.value) {
        return this.$message({
          message: '请选择借阅天数！',
          type: 'warning'
        })
      }
      const form = {
        name: this.book.name,
        author: this.book.author,
        isbn: this.book.isbn,
        value: this.value,
        date: this.date,
        cover: this.book.cover,
        isBorrow: '1',
        time: this.getTime()
      }
      addBookBorrow(form).then(res => {
        for (const item of this.books) {
          if (item.isbn === form.isbn) {
            item.isBorrow = '1'
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
.content {
  margin-bottom: 50px;
}
.table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.aside {
  border-right: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image {
  width: 210px;
  height: 280px;
}
.container {
  margin-left: 70px;
}
.title {
  font-size: 25px;
}
.introdution:hover {
  text-decoration: underline;
  color: rgb(134, 111, 111);
  cursor: pointer;
}
.footer {
  // background-color: aqua;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.word {
  color: rgb(5, 155, 155);
  margin-left: 20px;
}
.word:hover {
  color: #00c;
  cursor: pointer;
  text-decoration: underline;
}
.content-card {
  margin-top: 50px;
}
.perpage {
  width: 100px;
  margin: 0 10px;
}
.clearfix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.type {
  margin-bottom: 20px;
  .tag {
    margin-left: 10px;
  }
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
