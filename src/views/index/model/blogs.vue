<template>

  <div>
    <el-row>
      <el-col :span="5">
        <el-card
          v-for="(item , key) in cards"
          :key="key"
          class="card"
          shadow="hover"
          @click.native="clickCard(item.type)"
        >
          <span>{{ item.type }}</span>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div style="width: 70%;margin:0 auto;text-align:left">
          <div class="block">
            <el-timeline>
              <el-timeline-item v-for="(item, key) in blogs" :key="key" :timestamp="item.timestamp" placement="top">
                <el-card>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.foreword }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
      <el-col :span="3"/>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Blogs',
  data() {
    return {
      blogs: [
        {
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          foreword: '王小虎 提交于 2018/4/12 20:46'
        },
        {
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          forewor: '王小虎 提交于 2018/4/12 20:46'
        },
        {
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          foreword: '王小虎 提交于 2018/4/12 20:46'
        },
        {
          'timestamp': '2018/4/12',
          'title': '更新 Github 模板',
          'foreword': '王小虎 提交于 2018/4/12 20:46'
        }
      ],
      cards: [
        {
          type: 'java'
        },
        {
          type: 'JavaScript'
        },
        {
          type: 'Linux'
        }
      ]
    }
  },
  methods: {
    clickCard(id) {
      alert(id)
    }
  }
}
</script>

<style scoped>
  .card {
    width: 50%;
    margin: 10px auto;
  }

</style>
