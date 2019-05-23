<template>
  <div class="app-container">
    <!--搜索框-->
    <eHeader ref="qry" :query="query" :sup_this="sup_this" :dicts="dicts"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="q_title" label="习题名称"/>
      <el-table-column prop="q_type_desc" label="习题类型"/>
      <el-table-column :show-overflow-tooltip="true" prop="subject_type_main_desc" label="学科大类"/>
      <el-table-column :show-overflow-tooltip="true" prop="subject_type_desc" label="学科小类"/>
      <el-table-column :show-overflow-tooltip="true" prop="class_grade_desc" label="年级"/>
      <el-table-column :show-overflow-tooltip="true" prop="class_degree_desc" label="难度"/>
      <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="seeItemInfo(scope.row.q_title ,scope.row.q_info , scope.row.a_info)">查看
          </el-button>
          <edit
            v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT'])"
            :dicts="dicts"
            :data="scope.row"
            :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','USER_ALL','USER_DELETE'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id , scope.row.item_id)">确定
              </el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
    <!--查看弹出-->
    <el-dialog :visible.sync="dialogVisibleFlag" title="查看" append-to-body>
      <span class="seeContent">标题:</span>
      <div class="editor-content" v-html="seeContent_q_title"/>
      <span class="seeContent">题目内容:</span>
      <div class="editor-content" v-html="seeContent_q_info"/>
      <span class="seeContent">答案内容:</span>
      <div class="editor-content" v-html="seeContent_a_info"/>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/testItem'
import { getDepts } from '@/api/stuClass'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'

export default {
  components: { eHeader, edit },
  mixins: [initData, initDict],
  data() {
    return {
      height: document.documentElement.clientHeight - 180 + 'px;',
      delLoading: false, sup_this: this, deptName: '', depts: [],
      value: '',
      q_type: '',
      subject_type_main: '',
      subject_type: '',
      class_grade: '',
      class_degree: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisibleFlag: false,
      seeContent_q_title: '',
      seeContent_q_info: '',
      seeContent_a_info: ''
    }
  },
  created() {
    this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('user_status')
    })
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/testItem/qry'
      const query = this.query
      const type = query.type
      const value = query.value
      const enabled = query.enabled
      this.params = {
        page: this.page,
        size: this.size,
        q_type: query.q_type,
        subject_type_main: query.subject_type_main,
        subject_type: query.subject_type,
        class_grade: query.class_grade,
        class_degree: query.class_degree,
        value: query.value
      }
      if (type && value) {
        this.params[type] = value
      }
      if (enabled !== '' && enabled !== null) {
        this.params['enabled'] = enabled
      }
      return true
    },
    subDelete(id, itemId) {
      this.delLoading = true
      del(id, itemId).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (this.deptName) {
        params['name'] = this.deptName
      }
      getDepts(params).then(res => {
        this.depts = res.content
      })
    },
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.stuClass = null
        this.stuGrade = null
      } else {
        this.stuClass = data.id
        this.stuGrade = data.id
      }
      this.init()
    },
    seeItemInfo(q_title, q_info, a_info) {
      this.dialogVisibleFlag = true
      this.seeContent_q_title = q_title
      this.seeContent_q_info = q_info
      this.seeContent_a_info = a_info
    }
  }
}
</script>

<style scoped>
  .seeContent {
    font-size: 20px;
    color: #72a2ff;
    font-family: sans-serif;
  }

</style>
