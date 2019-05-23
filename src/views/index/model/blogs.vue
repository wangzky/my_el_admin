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
            <timeline v-for="(item, key) in blogs" :key="key">
              <timeline-title>{{ item.timestamp }} - {{ item.title }}</timeline-title>
              <timeline-item bg-color="#9dd8e0">{{ item.foreword }}</timeline-item>
            </timeline>
          </div>
        </div>
      </el-col>
      <el-col :span="3"/>
    </el-row>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  name: 'Blogs',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
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
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          foreword: '王小虎 提交于 2018/4/12 20:46'
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
