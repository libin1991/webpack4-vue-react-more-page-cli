<template>
  <router-layout id="__index">
    <router-view></router-view>
    <van-tabbar slot="footer" :fixed="false" v-model="active">
      <van-tabbar-item to="/" icon="shop">标签</van-tabbar-item>
      <van-tabbar-item to="/tab" icon="chat">标签</van-tabbar-item>
      <van-tabbar-item to="/swipe" icon="records">标签</van-tabbar-item>
    </van-tabbar>
  </router-layout>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    var path = this.$route.path
    switch (path) {
      case '/':
        this.active = 0
        break
      case '/tab':
        this.active = 1
        break
      case '/swipe':
        this.active = 2
        break
      default:
        this.active = 0
        break
    }
  }
}
</script>
