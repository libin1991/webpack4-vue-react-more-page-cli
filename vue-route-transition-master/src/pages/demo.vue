<template>
  <router-layout>
    <van-nav-bar title="demo" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell title="按钮" is-link :to="{path:'/button'}" />
      <van-cell title="地址编辑" is-link :to="{path:'/address'}" />
    </van-cell-group>

    <div style="margin:15px;">
      <van-button type="primary" @click="$router.go(-1)" size="large">返回</van-button>
    </div>
  </router-layout>
</template>
