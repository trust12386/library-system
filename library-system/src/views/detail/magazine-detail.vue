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
              :src="magazine.cover.imgurl"
              fit="fill"></el-image>
          </el-aside>
          <el-container>
            <el-header>
              <span style="font-size:24px">{{ magazine.name }}</span>
              <p style="font-size:18px">编辑单位:&nbsp;&nbsp;{{ magazine.author }}</p>
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
                {{ magazine.introdution }}
                <el-button type="text" @click="isCollapse=!isCollapse">
                  <span>收起</span>&nbsp;
                  <i class="el-icon-arrow-up"></i>
                </el-button>
              </div>
              <div v-if="!isLong" class="introdution">
                <p class="text">内容简介:</p>
                {{ magazine.introdution }}
              </div>
              <p class='text2'>杂志操作:</p>
              <el-row>
                <el-col :span="8">
                  <el-card class="button">
                    <i class="el-icon-star-on word" style="font-size:18px;margin-left: 20px;margin-right: 20px;" @click="removeCollection(magazine)" v-if="magazine.isCollection === true">
                      已收藏</i>
                    <i class="el-icon-star-off word" style="font-size:18px;margin-left: 20px;;margin-right: 20px;" @click="addCollection(magazine)" v-if="magazine.isCollection === false">
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
            <span style="font-size:20px;font-weight:bold;padding-left:20px;">杂志详情</span>
            <div style="background-color: #f8f8f8;width: 960px;">
              <el-row style="margin-top:20px">
                <el-col :span="8" style="margin-top:20px">
                  <span style="font-size:17px;padding-left:20px;">出版日期:&nbsp;&nbsp;{{ magazine.pubdate }}</span>
                </el-col>
                <el-col :span="8" style="margin-top:20px">
                  <span v-if="magazine.period.includes('0') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;周刊</span>
                  <span v-if="magazine.period.includes('1') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;旬刊</span>
                  <span v-if="magazine.period.includes('2') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;半月刊</span>
                  <span v-if="magazine.period.includes('3') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;月刊</span>
                  <span v-if="magazine.period.includes('4') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;双月刊</span>
                  <span v-if="magazine.period.includes('5') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;季刊</span>
                  <span v-if="magazine.period.includes('6') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;半年刊</span>
                  <span v-if="magazine.period.includes('7') === true" style="font-size:17px">发行周期:&nbsp;&nbsp;年刊</span>
                </el-col>
                <el-col :span="8" style="margin-top:20px">
                  <span style="font-size:17px">图书状态:&nbsp;&nbsp;
                    <el-tag type="success"  v-if="magazine.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                    <el-tag v-if="magazine.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                    <el-tag type="info" v-if="magazine.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                  </span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px">
                <el-col :span="8" style="margin-top:20px;padding-left:20px;">
                  <span style="font-size:17px">国内刊号:&nbsp;&nbsp;CN{{ magazine.number }}</span>
                </el-col>
                <el-col :span="12" style="margin-top:20px;margin-bottom:20px;">
                  <span style="font-size:17px">图书类别:
                    <el-tag v-if="magazine.type.includes('0') === true" effect="dark" class="tag" >新闻类</el-tag>
                    <el-tag type="success" v-if="magazine.type.includes('1') === true" effect="dark" class="tag">文艺类</el-tag>
                    <el-tag type="info" v-if="magazine.type.includes('2') === true" effect="dark" class="tag">理科类</el-tag>
                    <el-tag type="warning" v-if="magazine.type.includes('3') === true" effect="dark" class="tag">工科类</el-tag>
                    <el-tag type="danger" v-if="magazine.type.includes('4') === true" effect="dark" class="tag">天地生化类</el-tag>
                    <el-tag v-if="magazine.type.includes('5') === true" class="tag" effect="dark">知识类</el-tag>
                    <el-tag v-if="magazine.type.includes('6') === true" class="tag" effect="dark">娱乐类</el-tag>
                    <el-tag v-if="magazine.type.includes('7') === true" class="tag" effect="dark">科普类</el-tag>
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
import { removeMagazineCollectionReader, addMagazineCollectionReader } from '@/api/magazine'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      magazine: [],
      introdution: '',
      isCollapse: false,
      isLong: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadDetail()
    if (this.magazine.introdution.length > 100) {
      this.isLong = true
      this.isCollapse = true
      this.introdution = this.magazine.introdution.slice(0, 100) + '...'
    }
  },
  mounted () {},
  methods: {
    loadDetail () {
      this.magazine = JSON.parse(this.$route.query.magazine)
      console.log(this.magazine)
    },
    goBack () {
      this.$router.back()
    },
    addCollection (magazine) {
      addMagazineCollectionReader(magazine).then(res => {
        magazine.isCollection = true
        this.$forceUpdate()
      })
    },
    removeCollection (magazine) {
      removeMagazineCollectionReader(magazine).then(res => {
        magazine.isCollection = false
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
