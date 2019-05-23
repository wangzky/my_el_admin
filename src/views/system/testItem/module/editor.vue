<template>
  <div>
    <div ref="editor" style="text-align:left;width: 100%;"/>
    <el-button type="text" @click="dialogTableVisible = true">预览</el-button>
    <el-dialog :visible.sync="dialogTableVisible" title="预览" append-to-body>
      <div class="editor-content" v-html="editorContent"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      editor: null,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      editorContent: '',
      dialogTableVisible: false,
      clearFlag: false,
      value: '',
      editFlag: '0'
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  watch: {
    value: function(val) {
      console.log(val)
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // 不可修改
    this.editor.customConfig.uploadImgHeaders = this.headers
    // 自定义文件名，不可修改，修改后会上传失败
    this.editor.customConfig.uploadFileName = 'file'
    // editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    this.editor.create()
    this.editor.txt.html()
  },
  methods: {
    getEditorInfo() {
      this.$emit('listenEditInfo', this.editorContent)
    },
    destroy() {
      this.editor.txt.html('<p><br></p>')
    },
    initializationData(val) {
      this.editorContent = val
      this.editor.txt.html(val)
    }
  }
}
</script>

<style scoped>
  .editor-content {
    padding-left: 5px;
  }
</style>
