<template>
  <div class="app-container">
    <!--搜索框-->
    <eHeader :query="query" :sup_this="sup_this" :dicts="dicts"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话"/>
      <el-table-column label="年级 / 班级">
        <template slot-scope="scope">
          <div>{{ scope.row.stuGradeDesc }} / {{ scope.row.stuClassDesc }}</div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="school" label="学校"/>
      <el-table-column :show-overflow-tooltip="true" prop="campus" label="校区"/>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
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
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
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
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/stuMember'
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
      delLoading: false, sup_this: this, deptName: '', depts: [], stuClass: null, stuGrade: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
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
      this.url = 'api/stuMember'
      const sort = 'id,desc'
      const query = this.query
      const type = query.type
      const value = query.value
      const enabled = query.enabled
      this.params = { page: this.page, size: this.size, sort: sort, stuClass: this.stuClass, stuGrade: this.stuGrade }
      if (type && value) {
        this.params[type] = value
      }
      if (enabled !== '' && enabled !== null) {
        this.params['enabled'] = enabled
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
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
    }
  }
}
</script>

<style scoped>
</style>