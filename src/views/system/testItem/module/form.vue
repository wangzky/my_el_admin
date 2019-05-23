<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增试题' : '编辑试题'" append-to-body width="70%" top="10px">
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-form-item label="题型">
        <el-select v-model="form.q_type" clearable placeholder="题型" class="filter-item" style="width: 130px">
          <el-option v-for="item in q_types" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学科大类">
        <el-select
          v-model="form.subject_type_main"
          clearable
          placeholder="学科大类"
          class="filter-item"
          style="width: 130px">
          <el-option v-for="item in subject_type_mains" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学科小类">
        <el-select v-model="form.subject_type" clearable placeholder="学科小类" class="filter-item" style="width: 130px">
          <el-option v-for="item in subject_types" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="form.class_grade" clearable placeholder="年级" class="filter-item" style="width: 130px">
          <el-option v-for="item in class_grades" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-select v-model="form.class_degree" clearable placeholder="难度" class="filter-item" style="width: 130px">
          <el-option v-for="item in class_degrees" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="习题标题" prop="q_title">
          <el-input v-model="form.q_title" style="width: 260px;"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="习题内容" prop="q_info">
          <Editor ref="qEditor" v-model="form.q_info" @listenEditInfo="editInfo('q_info',$event)"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="习题答案" prop="a_info">
          <Editor ref="aEditor" v-model="form.a_info" @listenEditInfo="editInfo('a_info',$event)"/>
        </el-form-item>
      </div>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" style="width: 250%;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { add, edit } from '@/api/testItem'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Editor from './editor'
import { get } from '@/api/dictDetail'

export default {
  components: { Treeselect, Editor },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      q_info: '',
      stuClass: '',
      form: {
        id: '',
        item_id: '',
        q_type: '',
        subject_type_main: '',
        subject_type: '',
        class_grade: '',
        class_degree: '',
        q_title: '',
        q_info: '',
        a_info: '',
        remark: ''
      },
      style: 'width: 184px',
      editorInfo: '',
      editList: [
        {
          title: '习题内容',
          var: 'q_info'
        },
        {
          title: '习题答案',
          var: 'a_info'
        }
      ],
      q_types: [],
      subject_type_mains: [],
      subject_types: [],
      class_grades: [],
      class_degrees: [],
      value: {
        q_info: '',
        a_info: ''
      },
      editFlag: false
    }
  },
  watch: {
    editFlag: function() {
      this.$nextTick(function() {
        this.initData()
      })
    }
  },
  created() {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
    this.qrySelectOption()
  },
  methods: {
    cancel() {
      this.resetForm()
      this.destroyEditor()
    },
    doSubmit() {
      this.$refs.qEditor.getEditorInfo()
      this.$refs.aEditor.getEditorInfo()

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else {
            this.doEdit()
          }
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.destroyEditor()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.destroyEditor()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        q_type: '',
        subject_type_main: '',
        subject_type: '',
        class_grade: '',
        class_degree: '',
        q_title: '',
        q_info: '',
        a_info: '',
        remark: ''
      }
    },
    change() {
      this.$forceUpdate()
    },
    editInfo(a, info) {
      if (a === 'q_info') {
        this.form.q_info = info
      } else if (a === 'a_info') {
        this.form.a_info = info
      } else {
        console.error('传值有误！')
      }
    },
    qrySelectOption() {
      this.getOption('q_type')
      this.getOption('subject_type_main')
      this.getOption('subject_type')
      this.getOption('class_grade')
      this.getOption('class_degree')
    },
    getOption(name) {
      get(name).then(res => {
        var content = res.content
        switch (name) {
          case 'q_type':
            this.q_types = content
            break
          case 'subject_type_main':
            this.subject_type_mains = content
            break
          case 'subject_type':
            this.subject_types = content
            break
          case 'class_grade':
            this.class_grades = content
            break
          case 'class_degree':
            this.class_degrees = content
            break
        }
      })
    },
    destroyEditor() {
      this.$refs.qEditor.destroy()
      this.$refs.aEditor.destroy()
      this.resetForm()
    },
    initData() {
      this.$refs.aEditor.initializationData(this.value.a_info)
      this.$refs.qEditor.initializationData(this.value.q_info)
    }
  }
}
</script>

<style scoped>

</style>
