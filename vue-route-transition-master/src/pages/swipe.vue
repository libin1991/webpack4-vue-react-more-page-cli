<template>
  <div>
    <van-swipe :autoplay="3000" :height="200" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <p style="text-align:center;">tabbar路由页面不需要动画</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.van-swipe-item{
  background: #338EFF;
  display: flex;align-items: center;color: #fff;justify-content: center;
}
</style>
