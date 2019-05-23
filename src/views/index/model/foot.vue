<template>
  <div class="page-foot">
    <h1>Welcome to <a href="http://www.wangzk.cn">wangzk.cn</a></h1>
    <h3>备案号：<a href="http://www.miibeian.gov.cn/">京ICP备19021313号</a></h3>
  </div>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>

  .page-foot {
    /*position: absolute;*/
    bottom: 0px;
    width: 99%;
    height: auto;
    text-align: center;
    background: #0000;
    z-index: 2;
    overflow: hidden;
    font-size: .7rem;
    font-family: "黑体";
    margin: 0 auto;
    padding-top: .9rem;
  }
</style>
