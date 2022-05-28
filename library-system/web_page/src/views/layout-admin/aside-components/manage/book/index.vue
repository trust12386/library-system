<template>
  <div>
    <el-card class="box-card">
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
          <el-checkbox-group v-model="form.resource">
            <el-checkbox label="1" name="resource">在借</el-checkbox>
            <el-checkbox label="2" name="resource">在馆</el-checkbox>
            <el-checkbox label="3" name="resource">下架</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共筛选出？？？条结果:
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="table"
        >
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Book',
  components: {},
  props: {},
  data () {
    return {
      form: {
        type: [],
        resource: []
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log(this.form.type)
    },
    resetForm () {
      this.form.type = []
      this.form.resource = []
    }
  }
}
</script>

<style scoped lang="less">
.table {
  margin-bottom: 20px;
}
</style>
