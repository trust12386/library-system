<template>
  <div class="">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label" style="font-size:18px">我的图书</span>
        <el-row>
          <el-col :span="12" v-for="(item,index) in books" :key="index">
            <el-container style="padding-bottom:10px">
              <el-aside width="250px" class="aside">
                <el-image
                class="image"
                :src="item.cover.imgurl"
                fit="fill"></el-image>
              </el-aside>
              <el-container>
                <el-header height="20px">
                  <el-link style="font-size:20px">{{ item.name }}</el-link>
                </el-header>
                <el-main width="250px">
                  <el-descriptions class="table" title="" :column="1" size="medium" style="width:520px">
                    <el-descriptions-item label="作者">
                      <span>{{ item.author }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="发布日期">
                      {{ item.pubdate }}
                    </el-descriptions-item>
                    <el-descriptions-item label="ISBN">
                      {{ item.isbn }}
                    </el-descriptions-item>
                    <el-descriptions-item label="图书状态">
                      <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                      <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                      <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                    </el-descriptions-item>
                  </el-descriptions>
                  <div class="type">
                    <span style="font-size:14px;color:#606266">图书类别:</span>
                    <el-tag v-if="item.classify.includes('0') === true" effect="dark" class="tag" >人文社科</el-tag>
                    <el-tag type="success" v-if="item.classify.includes('1') === true" effect="dark" class="tag">自然科学</el-tag>
                    <el-tag type="info" v-if="item.classify.includes('2') === true" effect="dark" class="tag">文学艺术</el-tag>
                    <el-tag type="warning" v-if="item.classify.includes('3') === true" effect="dark" class="tag">财经生活</el-tag>
                    <el-tag type="danger" v-if="item.classify.includes('4') === true" effect="dark" class="tag">少儿图书</el-tag>
                    <el-tag v-if="item.classify.includes('5') === true" class="tag" effect="dark">名人名著</el-tag>
                  </div>
                </el-main>
                <el-footer height="40px" class="footer">
                  <i class="el-icon-delete word" style="margin-right:10px;">删除</i>
                  <i class="el-icon-collection word" style="margin-right:70px;">借阅</i>
                </el-footer>
              </el-container>
            </el-container>
          </el-col>
        </el-row>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChangeBook"
            :current-page.sync="book.page"
            background
            :page-size="book.perpage"
            layout="prev, pager, next, jumper"
            :total="bookTotal">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="font-size:18px">我的杂志</span>
        <el-row>
          <el-col :span="12" v-for="(item,index) in magazines" :key="index">
            <el-container style="padding-bottom:10px">
              <el-aside width="250px" class="aside">
                <el-image
                class="image"
                :src="item.cover.imgurl"
                fit="fill"></el-image>
              </el-aside>
              <el-container>
                <el-header height="20px">
                  <el-link style="font-size:20px">{{ item.name }}</el-link>
                </el-header>
                <el-main width="250px">
                  <el-descriptions class="table" title="" :column="1" size="medium" style="width:520px">
                    <el-descriptions-item label="编辑单位">
                      <span>{{ item.author }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="发布日期">
                      {{ item.pubdate }}
                    </el-descriptions-item>
                    <el-descriptions-item label="国内刊号">
                      {{ item.number }}
                    </el-descriptions-item>
                    <el-descriptions-item label="杂志状态">
                      <el-tag type="success"  v-if="item.status.includes('0') === true" effect="dark" size="small">在借</el-tag>
                      <el-tag v-if="item.status.includes('1') === true" effect="dark" size="small">在馆</el-tag>
                      <el-tag type="info" v-if="item.status.includes('2') === true" effect="dark" size="small">下架</el-tag>
                    </el-descriptions-item>
                  </el-descriptions>
                  <div class="type">
                    <span style="font-size:14px;color:#606266">杂志类别:</span>
                    <el-tag v-if="item.type.includes('0') === true" effect="dark" class="tag" >新闻类</el-tag>
                    <el-tag type="success" v-if="item.type.includes('1') === true" effect="dark" class="tag">文艺类</el-tag>
                    <el-tag type="info" v-if="item.type.includes('2') === true" effect="dark" class="tag">理科类</el-tag>
                    <el-tag type="warning" v-if="item.type.includes('3') === true" effect="dark" class="tag">工科类</el-tag>
                    <el-tag type="danger" v-if="item.type.includes('4') === true" effect="dark" class="tag">天地生化类</el-tag>
                    <el-tag v-if="item.type.includes('5') === true" class="tag" effect="dark">知识类</el-tag>
                    <el-tag v-if="item.type.includes('6') === true" class="tag" effect="dark">娱乐类</el-tag>
                    <el-tag v-if="item.type.includes('7') === true" class="tag" effect="dark">科普类</el-tag>
                  </div>
                </el-main>
                <el-footer height="40px" class="footer">
                  <i class="el-icon-delete word" style="margin-right:10px;">删除</i>
                  <i class="el-icon-collection word" style="margin-right:70px;">借阅</i>
                </el-footer>
              </el-container>
            </el-container>
          </el-col>
        </el-row>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChangeMagazine"
            :current-page.sync="magazine.page"
            background
            :page-size="magazine.perpage"
            layout="prev, pager, next, jumper"
            :total="magazineTotal">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getBookCollectionReader } from '@/api/book'
import { getMagazineCollectionReader } from '@/api/magazine'
export default {
  name: 'bookshelf',
  components: {},
  props: {},
  data () {
    return {
      book: {
        page: 1,
        perpage: 6
      },
      magazine: {
        page: 1,
        perpage: 6
      },
      books: [],
      magazines: [],
      bookTotal: 0,
      magazineTotal: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCollectionBook()
    this.loadCollectionMagazine()
  },
  mounted () {},
  methods: {
    loadCollectionBook () {
      getBookCollectionReader(this.book).then(res => {
        this.books = res.data.data.books
        this.bookTotal = res.data.data.total
      })
    },
    handleCurrentChangeBook () {
      this.loadCollectionBook()
    },
    loadCollectionMagazine () {
      getMagazineCollectionReader(this.magazine).then(res => {
        this.magazines = res.data.data.magazines
        this.magazineTotal = res.data.data.total
      })
    },
    handleCurrentChangeMagazine () {
      this.loadCollectionMagazine()
    }
  }
}
</script>

<style scoped lang="less">
.aside {
  border-right: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  .image {
    width: 180px;
    height: 240px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.introdution {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.tag {
  margin-left: 10px;
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
