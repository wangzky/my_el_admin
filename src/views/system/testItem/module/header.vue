<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input
      v-model="query.value"
      clearable
      placeholder="输入关键字搜索"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    <el-select v-model="query.q_type" clearable placeholder="题型" class="filter-item" style="width: 130px">
      <el-option v-for="item in q_types" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.subject_type_main" clearable placeholder="学科大类" class="filter-item" style="width: 130px">
      <el-option v-for="item in subject_type_mains" :key="item.id" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.subject_type" clearable placeholder="学科小类" class="filter-item" style="width: 130px">
      <el-option v-for="item in subject_types" :key="item.id" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.class_grade" clearable placeholder="年级" class="filter-item" style="width: 130px">
      <el-option v-for="item in class_grades" :key="item.id" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.class_degree" clearable placeholder="难度" class="filter-item" style="width: 130px">
      <el-option v-for="item in class_degrees" :key="item.id" :label="item.label" :value="item.value"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-if="checkPermission(['ADMIN','USER_ALL','USER_CREATE'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增
      </el-button>
      <eForm ref="form" :sup_this="sup_this" :is-add="true" :dicts="dicts"/>
    </div>
    <!-- 导出 -->
    <el-button
      v-if="checkPermission(['ADMIN'])"
      :loading="downloadLoading"
      size="mini"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="download">导出
    </el-button>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import eForm from './form'
import { get } from '@/api/dictDetail'

// 查询条件
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true,
      q_type: '',
      subject_type_main: Object,
      subject_type: Object,
      class_grade: Object,
      class_degree: Object
    },
    sup_this: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      q_types: [],
      subject_type_mains: [],
      subject_types: [],
      class_grades: [],
      class_degrees: []
    }
  },
  created() {
    this.qrySelectOption()
  },
  methods: {
    checkPermission,
    add() {
      this.$refs.form.getStuGrades()
      this.$refs.form.dialog = true
    },
    // 去查询
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    },
    // 导出
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '年龄', '电话', '年级', '班级', '学校', '校区', '备注']
        const filterVal = ['name', 'age', 'phone', 'stuGradeDesc', 'stuClassDesc', 'school', 'campus', 'remark']
        const data = this.formatJson(filterVal, this.sup_this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学生名单'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
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
    }
  }
}
</script>
