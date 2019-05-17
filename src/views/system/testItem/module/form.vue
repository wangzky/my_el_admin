<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增试题' : '编辑试题'" append-to-body width="70%">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="题型">
        <el-select v-model="form.q_type" clearable placeholder="题型" class="filter-item" style="width: 130px">
          <el-option v-for="item in q_types" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学科大类">
        <el-select v-model="form.subject_type_main" clearable placeholder="学科大类" class="filter-item" style="width: 130px">
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
        <el-form-item label="习题标题" prop="name">
          <el-input v-model="form.q_title" style="width: 160px;"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="习题内容" prop="name">
          <Editor/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="习题答案" prop="name">
          <Editor/>
        </el-form-item>
      </div>
      <el-form-item label="备注" prop="name">
        <el-texteare v-model="form.remark" style="width: 160px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { add, edit } from '@/api/stu'
import { getStuClasssById } from '@/api/stuClass'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Editor from './editor'

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
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialog: false,
      loading: false,
      stuGrade: '',
      stuClass: '',
      form: {
        name: '',
        age: '',
        phone: '',
        stuGrade: '',
        stuClass: '',
        school: '',
        campus: '',
        remark: ''
      },
      roleIds: [],
      roles: [],
      stuGrades: [],
      stuClasss: [],
      style: 'width: 184px',
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      }
    }
  },
  created() {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.form.stuGrade = this.stuGrade
      this.form.stuClass = this.stuClass
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
        name: '',
        age: '',
        phone: '',
        stuGrade: '',
        stuClass: '',
        school: '',
        campus: '',
        remark: ''
      }
    },
    getStuClasss(id) {
      getStuClasssById(id).then(res => {
        this.stuClasss = res.content
        if (this.form.stuClass !== '') {
          this.stuClass = parseInt(this.form.stuClass)
        } else {
          this.stuClass = this.stuClasss[0].id
        }
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    getStuGrades() {
      getStuClasssById(1).then(res => {
        this.stuGrades = res.content
        if (this.form.stuGrade !== '') {
          this.stuGrade = parseInt(this.form.stuGrade)
        }
      })
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
      return reg.test(str)
    },
    selectFun(node, instanceId) {
      this.getStuClasss(node)
    },
    change() {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
