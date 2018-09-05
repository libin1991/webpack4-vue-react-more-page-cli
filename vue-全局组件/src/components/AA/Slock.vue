<template>
  <div class="clock" :class="className">
    {{setTime(h)}}:
    {{setTime(m)}}:
    {{setTime(s)}}
  </div>
</template>

<script>
export default {
  name: 'Slock',
  data () {
    return {
      h: 0,
      m: 0,
      s: 0
    }
  },
  props:['className'],
  mounted(){
    this.clock();
    setInterval(()=>{
      this.clock();
      //console.log("时间")
    },1000);
  },
  methods:{
   setTime(num){
      return num < 10 ? ("0" + num) : num;
    },
    clock(){
      var oDate = new Date();
      this.h = oDate.getHours();
      this.m = oDate.getMinutes();
      this.s = oDate.getSeconds();
    }
  }
}
</script>

<style scoped>
.clock{
  display: inline-block;
  font-size: 14px;
}
</style>
