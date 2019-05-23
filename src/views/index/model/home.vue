<template>
  <div class="carouselClass">
    <!--轮播-->
    <div style="margin-top: 0px;z-index:1">
      <el-carousel :autoplay="false" height="800px" direction="vertical">
        <el-carousel-item v-for="item in picList" :key="item">
          <img :src="item.url" class="imgClass">
        </el-carousel-item>
      </el-carousel>
    </div>
    <foot/>
  </div>
</template>

<script>
import foot from './foot'

export default {
  name: 'Home',
  components: { foot },
  data() {
    return {
      picList: [
        { url: 'https://i.loli.net/2019/05/20/5ce2613ce25a323201.jpg' },
        { url: 'https://i.loli.net/2019/05/20/5ce2613ce25a323201.jpg' },
        { url: 'https://i.loli.net/2019/05/20/5ce2613ce25a323201.jpg' },
        { url: 'https://i.loli.net/2019/05/20/5ce2613ce25a323201.jpg' },
        { url: 'https://i.loli.net/2019/05/20/5ce2613ce25a323201.jpg' }
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .carouselClass {
    z-index: 99999;
    top: 0px;
  }

  .imgClass {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
