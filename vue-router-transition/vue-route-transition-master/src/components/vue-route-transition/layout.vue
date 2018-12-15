<template>
  <div class="vue-route-transition-wrapper">
    <slot name="header"></slot>
    <div class="vue-route-transition-content" :id="cId">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: 'router-layout',
  props: {
    id: String
  },
  data () {
    return {
      cId: this.id || this.$route.path.replace(/\//g, '_') || '_null_'
    }
  }
}
</script>

<style lang="less">
body,html{height: 100%;height: 100%;}
.vue-route-transition-wrapper{
  background: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .vue-route-transition-content{
    width: 100%;
    height: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
}
</style>
