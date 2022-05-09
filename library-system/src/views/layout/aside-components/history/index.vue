<template>
  <div class="">
    <el-card class="bookHistory">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/layout'>首页</el-breadcrumb-item>
          <el-breadcrumb-item>浏览历史</el-breadcrumb-item>
          <el-breadcrumb-item>图书</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" @click="viewBookHistory">
          历史详情
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <el-row style="margin-top:10px">
        <el-col :span="6" v-for="(item,index) in books" :key="index">
          <el-container>
            <el-aside width="200px" class="aside">
              <el-image
                class="image"
                :src="item.cover.imgurl"
                fit="fill"></el-image>
            </el-aside>
            <el-container style="padding-left:10px;">
              <el-header style="height:30px;padding-top:20px">
                <el-link style="font-size:20px">{{ item.name }}</el-link>
              </el-header>
              <el-main style="padding-top:40px">
                <el-descriptions :column="1">
                  <el-descriptions-item label="作者">{{ item.author }}</el-descriptions-item>
                  <el-descriptions-item label="出版日期">{{ item.pubdate }}</el-descriptions-item>
                  <el-descriptions-item label="图书状态">
                    <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                    <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                    <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-main>
              <el-footer class="footer" height="50px">
                <i class="el-icon-delete word" style="margin-right:10px;">删除</i>
              </el-footer>
            </el-container>
          </el-container>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="magazineHistory">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/layout'>首页</el-breadcrumb-item>
          <el-breadcrumb-item>浏览历史</el-breadcrumb-item>
          <el-breadcrumb-item>杂志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" @click="viewMagazineHistory">
          历史详情
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <el-row style="margin-top:10px">
        <el-col :span="6" v-for="(item,index) in magazines" :key="index">
          <el-container>
            <el-aside width="200px" class="aside">
              <el-image
                class="image"
                :src="item.cover.imgurl"
                fit="fill"></el-image>
            </el-aside>
            <el-container style="padding-left:10px;">
              <el-header style="height:30px;padding-top:20px">
                <el-link style="font-size:20px">{{ item.name }}</el-link>
              </el-header>
              <el-main style="padding-top:40px">
                <el-descriptions :column="1">
                  <el-descriptions-item label="作者">{{ item.author }}</el-descriptions-item>
                  <el-descriptions-item label="出版日期">{{ item.pubdate }}</el-descriptions-item>
                  <el-descriptions-item label="图书状态">
                    <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                    <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                    <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-main>
              <el-footer class="footer" height="50px">
                <i class="el-icon-delete word" style="margin-right:10px;">删除</i>
              </el-footer>
            </el-container>
          </el-container>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getBookHistoryReader } from '@/api/book'
import { getMagazineHistoryReader } from '@/api/magazine'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      books: [],
      magazines: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadBookHistory()
    this.loadMagazineHistory()
  },
  mounted () {},
  methods: {
    loadBookHistory () {
      getBookHistoryReader().then(res => {
        this.books = res.data.data.books
      })
    },
    loadMagazineHistory () {
      getMagazineHistoryReader().then(res => {
        this.magazines = res.data.data.magazines
      })
    },
    viewBookHistory () {
      this.$router.push({
        path: '/layout/book-history'
      })
    },
    viewMagazineHistory () {
      this.$router.push({
        path: '/layout/magazine-history'
      })
    }
  }
}
</script>

<style scoped lang="less">
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card /deep/ .el-card__header {
  padding: 3px 20px;
}
.aside {
  border-right: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  .image {
    width: 150px;
    height: 200px;
  }
}
.bookHistory {
  margin: 10px 0 60px 0;
}
.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.word {
  color: rgb(5, 155, 155);
}
.word:hover {
  color: #00c;
  cursor: pointer;
  text-decoration: underline;
}
</style>
