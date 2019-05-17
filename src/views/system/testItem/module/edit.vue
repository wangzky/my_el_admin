<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :dicts="dicts"/>
  </div>
</template>
<script>
import eForm from './form'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        age: this.data.age,
        stuGrade: this.data.stuGrade,
        stuClass: this.data.stuClass,
        school: this.data.school,
        campus: this.data.campus,
        remark: this.data.remark,
        id: this.data.id,
        name: this.data.name,
        phone: this.data.phone
      }
      _this.getStuGrades()
      if (this.data.stuGrade !== null && this.data.stuGrade !== '') {
        _this.getStuClasss(this.data.stuGrade)
      }
      // _this.stuGrade = this.data.stuGrade
      // _this.stuClass = this.data.stuClass
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div {
    display: inline-block;
    margin-right: 3px;
  }
</style>
