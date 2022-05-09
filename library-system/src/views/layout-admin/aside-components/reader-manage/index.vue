<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/layout-admin'>首页</el-breadcrumb-item>
          <el-breadcrumb-item>读者管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="form.input" class="input-with-select">
          <el-select v-model="form.select" slot="prepend" placeholder="请选择" class="select-title">
            <el-option label="账号" value="1"></el-option>
            <el-option label="用户名" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
      <p class="word">共有&nbsp;{{ total }}&nbsp;条结果:</p>
      <div v-for="(item,index) in readers" :key="index" class="reader">
        <el-container>
          <el-aside class="readerAside" width='300px'>
            <el-image
            class="image"
            :src="item.imgsrc"
            fit="fill"></el-image>
          </el-aside>
          <el-main class="readerMain">
            <div id="left">
              <p style="margin:0 0 20px 0;font-size:18px">用户名称:&nbsp;&nbsp;{{ item.name }}</p>
              <p style="margin:0;font-size:18px">用户账号:&nbsp;&nbsp;{{ item.account }}</p>
            </div>
            <div id="right">
              <i :class="{
                'el-icon-arrow-right': !item.isCollapse,
                'el-icon-arrow-down': item.isCollapse
              }"
                style="font-size:25px;cursor:pointer"
                @click="Collapse(item)"
              ></i>
            </div>
          </el-main>
        </el-container>
        <el-collapse-transition>
          <div v-show="item.isCollapse">
            <el-tabs style="margin-top:20px" type="border-card">
              <el-tab-pane>
                <span slot="label" style="font-size:18px">图书借阅</span>
                <div style="display:flex;justify-content:end">
                  <el-button type="text" style="font-size:18px;" @click="viewDetail(item)">
                    借阅详情
                    <i class="el-icon-arrow-right"></i>
                  </el-button>
                </div>
                <el-row style="margin-top:20px">
                <el-col :span="8" v-for="(tip,index) in item.passBook.slice(0,3)" :key="index">
                  <el-container>
                    <el-aside width="100px" class="bookAside">
                      <el-image
                        class="image"
                        :src="tip.cover.imgurl"
                        fit="fill"></el-image>
                    </el-aside>
                    <el-main style="padding:0 20px">
                      <div id="left">
                        <p style="font-size:18px">书名:&nbsp;&nbsp;{{ tip.name }}</p>
                        <p style="font-size:18px">作者:&nbsp;&nbsp;{{ tip.author }}</p>
                      </div>
                    </el-main>
                  </el-container>
                </el-col>
              </el-row>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label" style="font-size:18px">杂志借阅</span>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-transition>
      </div>
      <div style="display:flex;justify-content:center;margin-top:20px">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="form.page"
          :page-size="form.perpage"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReaderProfileAdmin } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        input: '',
        select: '',
        page: 1,
        perpage: 5
      },
      readers: [],
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onSearch()
  },
  mounted () {},
  methods: {
    getProfile () {
      getReaderProfileAdmin(this.form).then(res => {
        this.readers = res.data.data.reader
        this.total = res.data.data.total
        for (const item of this.readers) {
          item.isCollapse = false
        }
        for (const item of this.readers) {
          item.passBook = []
          for (const tip of item.bookBorrow) {
            tip.cover = JSON.parse(tip.cover)
            const time = new Date()
            const start = time.toLocaleDateString().replace(/\//g, '-').split('-')
            const end = tip.value[1].split('-')
            const Date1 = new Date(start[0], start[1], start[2])
            const Date2 = new Date(end[0], end[1], end[2])
            const date = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 / 24)
            tip.message = `距离还书日期还剩 ${date} 天`
            if (tip.isBorrow === '2') {
              item.passBook.push(tip)
            }
          }
        }
      })
    },
    onSearch () {
      if (this.form.select === '' && this.form.input !== '') {
        this.$message({
          message: '请选择要搜索的选项',
          type: 'warning'
        })
      } else if (this.form.select === '1' && this.form.input === '') {
        this.$message({
          message: '请输入要搜索的账号',
          type: 'warning'
        })
      } else if (this.form.select === '2' && this.form.input === '') {
        this.$message({
          message: '请输入要搜索的用户名称',
          type: 'warning'
        })
      } else {
        this.getProfile()
      }
    },
    Collapse (reader) {
      reader.isCollapse = !reader.isCollapse
      this.$forceUpdate()
    },
    handleCurrentChange () {
      this.onSearch()
    },
    viewDetail (reader) {
      this.$router.push({
        path: '/layout-admin/book-borrow',
        query: {
          account: JSON.stringify(reader.account)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.input-with-select {
  width: 500px;
}
.select-title {
  width: 100px;
}
.search {
  margin-top: 15px;
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  justify-content: center;
  .box-card {
    width: 1000px;
  }
}
.word {
  font-size: 20px;
  border-bottom: 1px solid rgb(199, 198, 198);
  padding: 20px 0;
  margin: 0;
}
.reader {
  padding: 20px 0;
  border-bottom: 1px solid rgb(199, 198, 198);
}
.readerAside {
  display: flex;
  align-items: center;
  justify-content: center;
  .image {
    width: 100px;
    height: 100px;
  }
}
.readerMain {
  display: flex;
  justify-content: space-between;
  #right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bookAside {
  display: flex;
  align-items: center;
  justify-content: center;
  .image {
    width: 90px;
    height: 120px;
  }
}
</style>
