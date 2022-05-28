<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
      </div>
      <el-container>
        <el-container>
          <el-aside width="280px" class="aside">
            <el-image
              class="image"
              :src="book.cover.imgurl"
              fit="fill"></el-image>
          </el-aside>
          <el-container>
            <el-header>
              <span style="font-size:24px">{{ book.name }}</span>
              <p style="font-size:18px">作者:&nbsp;&nbsp;{{ book.author }}</p>
            </el-header>
            <el-main>
              <div v-if="isLong && isCollapse" class="introdution">
                <p class="text">内容简介:</p>
                {{ introdution }}
                <el-button type="text" @click="isCollapse=!isCollapse">
                  <span>展开</span>&nbsp;
                  <i class="el-icon-arrow-down"></i>
                </el-button>
              </div>
              <div v-if="isLong && !isCollapse" class="introdution">
                <p class="text">内容简介:</p>
                {{ book.introdution }}
                <el-button type="text" @click="isCollapse=!isCollapse">
                  <span>收起</span>&nbsp;
                  <i class="el-icon-arrow-up"></i>
                </el-button>
              </div>
              <div v-if="!isLong" class="introdution">
                <p class="text">内容简介:</p>
                {{ book.introdution }}
              </div>
              <p class='text2'>图书操作:</p>
              <el-row>
                <el-col :span="8">
                  <el-card class="button">
                    <i class="el-icon-star-on word" style="font-size:18px;margin-left: 20px;margin-right: 20px;" @click="removeCollection(book)" v-if="book.isCollection === true">
                      已收藏</i>
                    <i class="el-icon-star-off word" style="font-size:18px;margin-left: 20px;;margin-right: 20px;" @click="addCollection(book)" v-if="book.isCollection === false">
                      收藏</i>
                    <i class="el-icon-collection word" style="font-size:18px;margin-right: 20px;">借阅</i>
                  </el-card>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-footer height=200px>
          <div class="detail">
            <span style="font-size:20px;font-weight:bold;padding-left:20px;">图书详情</span>
            <div style="background-color: #f8f8f8;width: 960px;">
              <el-row style="margin-top:20px">
                <el-col :span="12" style="margin-top:20px">
                  <span style="font-size:17px;padding-left:20px;">出版日期:&nbsp;&nbsp;{{ book.pubdate }}</span>
                </el-col>
                <el-col :span="12" style="margin-top:20px">
                  <span style="font-size:17px">图书状态:&nbsp;&nbsp;
                    <el-tag type="success"  v-if="book.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                    <el-tag v-if="book.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                    <el-tag type="info" v-if="book.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                  </span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px">
                <el-col :span="12" style="margin-top:20px;padding-left:20px;">
                  <span style="font-size:17px">国际标准书号ISBN:&nbsp;&nbsp;{{ book.isbn }}</span>
                </el-col>
                <el-col :span="12" style="margin-top:20px;margin-bottom:20px;">
                  <span style="font-size:17px">图书类别:
                    <el-tag v-if="book.classify.includes('0') === true" effect="dark" class="tag" >人文社科</el-tag>
                    <el-tag type="success" v-if="book.classify.includes('1') === true" effect="dark" class="tag">自然科学</el-tag>
                    <el-tag type="info" v-if="book.classify.includes('2') === true" effect="dark" class="tag">文学艺术</el-tag>
                    <el-tag type="warning" v-if="book.classify.includes('3') === true" effect="dark" class="tag">财经生活</el-tag>
                    <el-tag type="danger" v-if="book.classify.includes('4') === true" effect="dark" class="tag">少儿图书</el-tag>
                    <el-tag v-if="book.classify.includes('5') === true" class="tag" effect="dark">名人名著</el-tag>
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { removeBookCollectionReader, addBookCollectionReader } from '@/api/book'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      book: [],
      introdution: '',
      isCollapse: false,
      isLong: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadDetail()
    if (this.book.introdution.length > 100) {
      this.isLong = true
      this.isCollapse = true
      this.introdution = this.book.introdution.slice(0, 100) + '...'
    }
  },
  mounted () {},
  methods: {
    loadDetail () {
      this.book = JSON.parse(this.$route.query.book)
      console.log(this.book)
    },
    goBack () {
      this.$router.back()
    },
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
    }
  }
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  justify-content: center;
  .box-card {
    width: 1200px;
    margin-top: 50px;
  }
}
.word:hover {
  color: rgb(5, 155, 155);
  cursor: pointer;
  text-decoration: underline;
}
.aside {
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
  .image {
    width: 225px;
    height: 300px;
    margin: 20px 0;
  }
}
.el-button {
  padding-top: 0px;
}
.text {
  color:#3181be;
  margin-bottom: 0;
}
.text2 {
  color:#3181be;
  margin-top: 10px;
  margin-bottom: 10px;
}
.introdution {
  width: 600px;
  background-color: #f8f8f8;
}
.button {
  margin-top: 0px;
}
.el-card__body {
  padding: 0;
}
.el-main {
  padding: 20px 20px 0 20px;
}
.detail {
  margin: 20px 0 0 30px;
}
.tag {
    margin-left: 10px;
}
</style>
