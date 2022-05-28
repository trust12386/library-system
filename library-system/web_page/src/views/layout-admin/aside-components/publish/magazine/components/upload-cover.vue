<template>
  <div class="uoload-cover">
    <div class="cover-warp" @click="showCover">
      <img src="" ref="cover-image" class="cover-image">
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="网页图片" name="first">
          <el-input placeholder="请输入内容" v-model="imgsrc">
            <template slot="prepend">图片地址</template>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="本地图片" name="second">
          <input type="file" ref="file" @change="fileChange">
          <img src="" ref="preview-image" width="100px" alt="">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgsrc=''" class="clear" v-if="activeName==='first'">清空地址</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { loadImage } from '@/api/user'
export default {
  name: 'UploadCover',
  components: {},
  props: {},
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      imgsrc: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCover () {
      this.dialogVisible = true
    },
    fileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      console.log(blob)
      this.$refs['preview-image'].src = blob
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        const blob = window.URL.createObjectURL(file)
        if (!file) {
          this.$message('请选择图片！')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        loadImage(fd).then(res => {
          this.dialogVisible = false
          this.$refs['cover-image'].src = blob
          this.$emit('updata-cover', res.data.data.path)
        })
      } else if (this.activeName === 'first') {
        if (!this.imgsrc) {
          this.$message('请输入图片地址！')
          return
        }
        this.dialogVisible = false
        this.$refs['cover-image'].src = this.imgsrc
        this.$emit('updata-cover', this.imgsrc)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-warp {
  width: 216px;
  height: 216px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  .cover-image {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
