<template>
    <div>
      
      <p><router-link :to="{name:'index'}">主页</router-link></p>
      <p><router-link :to="{name:'login'}">登录</router-link></p>
      <p><router-link :to="{name:'logout'}">注销</router-link></p>
      <p><router-link :to="{name:'me'}">个人信息</router-link></p>
      <p>登录状态:{{this.$store.state.me.login}}</p>
    </div>
</template>

<script>

    export default {
      
    }
</script>

<style lang="less" scoped>

</style>