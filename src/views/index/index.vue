<template>
  <div>
    <div class="el_menu_class">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        active-text-color="#ffd04b"
        router
        @select="handleSelect"
      >
        <div class="f-right">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-submenu index="toolmenu" style="width: 140px">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/tool1">选项1</el-menu-item>
            <el-menu-item index="/tool2">选项2</el-menu-item>
            <el-menu-item index="/tool3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="/blogs">blogs</el-menu-item>
          <el-menu-item index="/admin">系统管理</el-menu-item>
        </div>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/home'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .f-right {
    float: right;
  }

  .el_menu_class {
    position: relative;
    z-index: 9999;
  }
</style>
