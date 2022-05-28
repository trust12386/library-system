<template>
  <div class="">
    <el-card class="header-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资源导航</el-breadcrumb-item>
        <el-breadcrumb-item>杂志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="book-form" :model="form" label-width="80px">
        <el-form-item label="发行周期">
          <el-checkbox-group v-model="form.period">
            <el-checkbox label="0" name="period">周刊</el-checkbox>
            <el-checkbox label="1" name="period">旬刊</el-checkbox>
            <el-checkbox label="2" name="period">半月刊</el-checkbox>
            <el-checkbox label="3" name="period">月刊</el-checkbox>
            <el-checkbox label="4" name="period">双月刊</el-checkbox>
            <el-checkbox label="5" name="period">季刊</el-checkbox>
            <el-checkbox label="6" name="period">半年刊</el-checkbox>
            <el-checkbox label="7" name="period">年刊</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="杂志分类">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="0" name="type">新闻类</el-checkbox>
            <el-checkbox label="1" name="type">文艺类</el-checkbox>
            <el-checkbox label="2" name="type">理科类</el-checkbox>
            <el-checkbox label="3" name="type">工科类</el-checkbox>
            <el-checkbox label="4" name="type">天地生化类</el-checkbox>
            <el-checkbox label="5" name="type">知识类</el-checkbox>
            <el-checkbox label="6" name="type">娱乐类</el-checkbox>
            <el-checkbox label="7" name="type">科普类</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="杂志状态">
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
      <el-container v-for="(item,index) in magazines" :key="index" class="content">
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
            <el-descriptions class="table" title="" :column="3" size="medium" style="width:1020px">
              <el-descriptions-item label="编辑单位">
                <span>{{ item.author }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="国内刊号">
                {{ item.number }}
              </el-descriptions-item>
              <el-descriptions-item label="发布日期">
                {{ item.pubdate }}
              </el-descriptions-item>
              <el-descriptions-item label="发行周期">
                <span v-if="item.period.includes('0') === true">周刊</span>
                <span v-if="item.period.includes('1') === true">旬刊</span>
                <span v-if="item.period.includes('2') === true">半月刊</span>
                <span v-if="item.period.includes('3') === true">月刊</span>
                <span v-if="item.period.includes('4') === true">双月刊</span>
                <span v-if="item.period.includes('5') === true">季刊</span>
                <span v-if="item.period.includes('6') === true">半年刊</span>
                <span v-if="item.period.includes('7') === true">年刊</span>
              </el-descriptions-item>
              <el-descriptions-item label="杂志状态">
                <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <div class="type">
              杂志类别:
              <el-tag v-if="item.type.includes('0') === true" effect="dark" class="tag" >新闻类</el-tag>
              <el-tag type="success" v-if="item.type.includes('1') === true" effect="dark" class="tag">文艺类</el-tag>
              <el-tag type="info" v-if="item.type.includes('2') === true" effect="dark" class="tag">理科类</el-tag>
              <el-tag type="warning" v-if="item.type.includes('3') === true" effect="dark" class="tag">工科类</el-tag>
              <el-tag type="danger" v-if="item.type.includes('4') === true" effect="dark" class="tag">天地生化类</el-tag>
              <el-tag v-if="item.type.includes('5') === true" class="tag" effect="dark">知识类</el-tag>
              <el-tag v-if="item.type.includes('6') === true" class="tag" effect="dark">娱乐类</el-tag>
              <el-tag v-if="item.type.includes('7') === true" class="tag" effect="dark">科普类</el-tag>
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
              <i class="el-icon-collection word">借阅</i>
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
  </div>
</template>

<script>
import {
  screenMagazine, screenMagazineReader, addMagazineHistoryReader, addMagazineCollectionReader, removeMagazineCollectionReader
} from '@/api/magazine'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        status: [],
        period: [],
        type: [],
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
      magazines: [],
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadMagazine()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.loadMagazine()
    if (this.scroll > 0) {
      document.querySelector('.el-main').scrollTo(0, this.scroll)
      this.scroll = 0
    }
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    ScreenMagazine (magazine) {
      screenMagazineReader(magazine).then(res => {
        this.magazines = res.data.data.magazines
        this.total = res.data.data.total
        // 判断要渲染列表中的图书是否在用户的收藏列表中
        if (res.data.data.collection.length === 0) {
          for (const item of this.magazines) {
            item.isCollection = false
          }
        } else {
          for (const item of this.magazines) {
            for (const tip of res.data.data.collection) {
              if (item.number === tip.number) {
                item.isCollection = true
                break
              } else {
                item.isCollection = false
              }
            }
          }
        }
      }).catch(err => {
        if (err) {
          screenMagazine(magazine).then(res => {
            this.magazines = res.data.data.magazines
            this.total = res.data.data.total
          })
        }
      })
    },
    resetForm () {
      this.form.type = []
      this.form.status = []
      this.form.period = []
    },
    loadMagazine () {
      this.ScreenMagazine(this.form)
    },
    onScreen () {
      this.ScreenMagazine(this.form)
    },
    selectChange () {
      this.ScreenMagazine(this.form)
    },
    handleCurrentChange () {
      document.querySelector('.el-main').scrollTo(0, 0)
      this.ScreenMagazine(this.form)
    },
    viewDetails (magazine) {
      addMagazineHistoryReader(magazine).then(res => {
      })
      this.$router.push({
        path: '/layout/magazine-detail',
        query: {
          magazine: JSON.stringify(magazine)
        }
      })
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
    },
    handleScroll () {
      this.scroll = document.querySelector('.el-main').scrollTop
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
</style>
