<template>
  <div class="content">
    <el-card class="card">
      <div slot="header" class="header">
        <el-page-header @back="goBack" content="历史详情"></el-page-header>
        <el-button style="color:#00a1d6" @click="clearAll">清空历史</el-button>
      </div>
      <el-container v-for="(item,index) in magazineHistory" :key="index">
        <el-aside width="200px" class="aside">
          <el-image
              class="image"
              :src="item.cover.imgurl"
              fit="fill"></el-image>
        </el-aside>
        <el-container>
          <el-header>
            <el-link style="font-size:20px">{{ item.name }}</el-link>
            <p style="font-size:15px">编辑单位:&nbsp;&nbsp;{{ item.author }}</p>
          </el-header>
          <el-main>
            <div style="margin-bottom:25px">
              <span style="font-size:15px;margin-top:0;">出版日期:&nbsp;&nbsp;{{ item.pubdate }}</span>
              <span class="icon" @click="deleteMagazine(item,index)">
                <i class="el-icon-delete">删除</i>
              </span>
            </div>
            <p style="font-size:15px;margin-bottom:25px">国内刊号:&nbsp;&nbsp;CN{{ item.number }}</p>
            <p style="font-size:15px;margin-bottom:0">杂志状态:&nbsp;&nbsp;
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
import { getMagazineDetailHistoryReader, deleteMagazineHistoryReader, deleteAllMagazineHistoryReader } from '@/api/magazine'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      magazineHistory: [],
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
    this.loadMagazineHistory()
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
        this.loadMagazineHistory() // 调用接口
      }, 500)
    },
    loadMagazineHistory () {
      getMagazineDetailHistoryReader(this.form).then(res => {
        this.magazineHistory = [...this.magazineHistory, ...res.data.data.magazines]
        this.totalPage = Number(res.data.data.totalPage)
        this.loading = false
      })
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
      deleteAllMagazineHistoryReader().then(res => {
        this.magazineHistory = []
        this.clear = true
        this.$forceUpdate()
      })
    },
    async deleteMagazine (magazine, index) {
      const info = {
        page: this.form.page + 1,
        perpage: this.form.perpage
      }
      if (!this.noMore) {
        await getMagazineDetailHistoryReader(info).then(res => {
          const magazine = res.data.data.magazines[0]
          if (magazine) {
            this.magazineHistory = [...this.magazineHistory, magazine]
          }
          this.totalPage = Number(res.data.data.totalPage)
          this.loading = false
        })
      }
      await deleteMagazineHistoryReader(magazine).then(res => {})
      this.magazineHistory.splice(index, 1)
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
