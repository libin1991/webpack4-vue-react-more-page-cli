<template>
  <div class="login-page">
    <div class="form">
      <p class="form-title">用户登录</p>
      <div class="form-item">
        <span class="form-item-title">账号</span>
        <input class="form-input" type="text" placeholder="请输入账号" 
         v-model="user.user_id" 
         @keyup.enter="login">
      </div>
      <div class="form-item">
        <span class="form-item-title">密码</span>
        <input class="form-input" type="password" placeholder="请输入密码" 
         v-model="user.user_pwd" 
         @keyup.enter="login">
      </div>
      <div class="form-item">
        <span class="form-item-title">验证码</span>
        <input class="form-input" type="text" placeholder="请输入验证码" 
         v-model="user.code" 
         @keyup.enter="login">
        <img class="form-checkcode" :src=img_base64 alt="验证码" title="点击切换验证码" 
         @click="get_check_code">
      </div>
      <div class="form-item">
        <button class="form-submit-btn"
         @click="login">登录</button>
      </div>
      <div class="form-bottom">
        <router-link class="form-jump-link" to="/register">没有账号，去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  async created(){
    // 获取验证码
    this.get_check_code();
  },
  data() {
    return {
      user: {
        user_id: '',
        user_pwd: '',
        code: '',
        code_token: ''
      },
      img_base64: ''
    }
  },
  methods: {
    async get_check_code(){
      let res = await this.$http.api_get_checkcode();
      let {code,msg,data = {}} = res.data;
      if(code == 200){
        this.img_base64 = data.img;
        this.user.code_token = data.token;
      }
    },
    async login(){
      if(this.user.user_id == "" || this.user.user_pwd == "" || this.user.code == ""){
        alert("请填写完整表单信息！！");
        return;
      }
      let res = await this.$http.api_login_user(this.user);
      let {code, msg,data ={}} = res.data;
      alert(msg);
      if(code == 200){
        // 登录成功，讲信息保存起来
        this.$store.commit('save', {
          _id: data._id,
          token: data.token,
          avatar: data.avatar,
          user_name: data.user_name
        })
        // 跳转路由到/home
        this.$router.push('/home');
      }
    }
  }
}
</script>


