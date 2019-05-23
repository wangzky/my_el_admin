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
        q_type: this.data.q_type,
        subject_type_main: this.data.subject_type_main,
        subject_type: this.data.subject_type,
        class_grade: this.data.class_grade,
        class_degree: this.data.class_degree,
        q_title: this.data.q_title,
        id: this.data.id,
        item_id: this.data.item_id,
        q_info: this.data.q_info,
        a_info: this.data.a_info
      }
      _this.value = {
        q_info: this.data.q_info,
        a_info: this.data.a_info
      }
      _this.dialog = true
      _this.editFlag = true
      // _this.initData()
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
