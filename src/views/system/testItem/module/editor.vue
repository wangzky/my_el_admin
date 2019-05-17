<template>
  <div>
    <div style="float: left">
      <div ref="editor" style="text-align:left;margin: 5px"/>
    </div>
    <div style="float: right;margin-left: 10px">
      <div style="margin: 12px 5px;font-size: 16px;font-weight: bold;color: #696969">实时预览：</div>
      <div class="editor-content" v-html="editorContent"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      editorContent: ''
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  mounted() {
    var editor = new E(this.$refs.editor)
    editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // 不可修改
    editor.customConfig.uploadImgHeaders = this.headers
    // 自定义文件名，不可修改，修改后会上传失败
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style scoped>
  .editor-content {
    padding-left: 5px;
  }
</style>
