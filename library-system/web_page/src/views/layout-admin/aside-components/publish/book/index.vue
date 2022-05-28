<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/layout-admin">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布图书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="书名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发布日期" prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="ISBN" prop="isbn">
                <el-input v-model="form.isbn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图书状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="在借" value="0"></el-option>
            <el-option label="在馆" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书类型" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="0" name="type">人文社科</el-checkbox>
            <el-checkbox label="1" name="type">自然科学</el-checkbox>
            <el-checkbox label="2" name="type">文学艺术</el-checkbox>
            <el-checkbox label="3" name="type">财经生活</el-checkbox>
            <el-checkbox label="4" name="type">少儿图书</el-checkbox>
            <el-checkbox label="5" name="type">名人名著</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="图书封面">
          <el-select v-model="form.cover.type">
            <el-option label="有封面" value="0"></el-option>
            <el-option label="无封面" value="1"></el-option>
          </el-select>
          <UploadCover class="cover" @updata-cover="onUpdataCover" v-if="form.cover.type === '0'"/>
        </el-form-item>
        <el-form-item label="图书简介" prop="introdution">
          <el-input type="textarea" v-model="form.introdution" rows="6"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Publish('form')">发布</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%">
      <span>确定发布此书吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onPublish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadCover from './components/upload-cover.vue'
import { publishBook } from '@/api/book'
export default {
  name: 'publish',
  components: {
    UploadCover
  },
  props: {},
  data () {
    return {
      form: {
        name: '',
        author: '',
        status: '',
        date: '',
        isbn: '',
        type: [],
        cover: {
          type: '1',
          imgurl: ''
        },
        introdution: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入书名', trigger: 'change' }
        ],
        author: [
          { required: true, message: '请输入作者名', trigger: 'change' }
        ],
        isbn: [
          { required: true, message: '请输入ISBN', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择图书的状态', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个图书类型', trigger: 'change' }
        ],
        introdution: [
          { required: true, message: '请填写图书简介', trigger: 'change' }
        ]
      },
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPublish () {
      this.dialogVisible = false
      publishBook(this.form).then(res => {
        if (res.data.data === 'success') {
          this.$message({
            message: '图书发布成功！',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        } else if (res.data.data === 'error') {
          this.$message.error('图书发布失败！')
        }
      })
    },
    Publish (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.dialogVisible = true
      })
    },
    onUpdataCover (url) {
      this.form.cover.imgurl = url
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.cover {
  margin-top: 20px;
}
</style>
