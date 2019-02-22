<template>
  <router-layout>
    <van-nav-bar slot="header" title="按钮" left-arrow @click-left="$router.go(-1)" />
    <div style="margin:15px;">
    <van-button size="large" type="default">默认按钮</van-button>
    <van-button size="large" type="primary">主要按钮</van-button>
    <van-button size="large" type="warning">警告按钮</van-button>
    <van-button size="large" type="danger">危险按钮</van-button>
    </div>
  </router-layout>
</template>

<style>
.van-button{margin-bottom: 15px;}
</style>
