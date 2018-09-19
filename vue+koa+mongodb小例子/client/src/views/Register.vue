<template>
  <div class="register-page">
    <div class="form">
      <p class="form-title">用户注册</p>
      <div class="form-item form-itme-avatar">
        <div class="avatar-box">
          <img class="avatar-show" :src=userInfo.avatar alt="上传头像">
          <label class="upload-img-btn" for="upload-img">上传图片</label>
          <input id="upload-img" type="file" @change="upload_img">
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title">称呼</span>
        <input class="form-input" type="text" placeholder="请输入称呼" v-model="userInfo.user_name">
      </div>
      <div class="form-item">
        <span class="form-item-title">账号</span>
        <input class="form-input" type="text" placeholder="请输入账号" v-model="userInfo.user_id">
      </div>
      <div class="form-item">
        <span class="form-item-title">密码</span>
        <input class="form-input" type="password" placeholder="请输入密码" v-model="userInfo.user_pwd">
      </div>
      <div class="form-item">
        <span class="form-item-title">确认密码</span>
        <input class="form-input" type="password" placeholder="请再次输入密码" v-model="userInfo.re_user_pwd">
      </div>
      <div class="form-item">
        <span class="form-item-title">验证码</span>
        <input class="form-input" type="text" placeholder="请输入验证码" v-model="userInfo.code"  @keyup.enter="submit">
        <img class="form-checkcode" :src=img_base64 alt="验证码" title="点击切换验证码" @click="get_check_code">
      </div>
      <div class="form-item">
        <button  class="form-submit-btn" @click="submit">注册</button>
      </div>
      <div class="form-bottom">
         <router-link class="form-jump-link" to="/login">已有账号，去登录</router-link>
      </div>
    </div>
    <div class="cropper-img-box" v-if="cropper_box_mark == true">
      <vueCropper
      ref="cropper"
      :img="cropperData.img"
      :autoCrop="cropperData.autoCrop"
      :autoCropWidth="cropperData.autoCropWidth"
      :autoCropHeight="cropperData.autoCropHeight"
      :fixedBox="cropperData.fixedBox"
    ></vueCropper>
    <div class="cropper-img-tool">
      <button class="cropper-img-tool-btn" @click="rotateRight">顺时针90°</button>
      <button class="cropper-img-tool-btn" @click="finish">确认</button>
      <button class="cropper-img-tool-btn" @click="cropper_box_mark = false">取消</button>
      <button class="cropper-img-tool-btn" @click="rotateLeft">逆时针90°</button>
    </div>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropper';
export default {
  components: {VueCropper},
  created(){
    this.get_check_code();
  },
  data() {
    return {
      cropperData: {
				img: '',
				autoCrop: true,
				autoCropWidth: 200,
				autoCropHeight: 200,
				fixedBox: true
      },
      cropper_box_mark: false,
      img_base64: '',
      userInfo: {
        user_name: '',
        user_id: '',
        user_pwd: '',
        re_user_pwd: '',
        avatar: '',
        code: '',
        code_token: ''
      }
    }
  },
  methods: {
    rotateRight(){
      this.$refs.cropper.rotateRight();
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish () {
      this.$refs.cropper.getCropData((data) => {
        this.userInfo.avatar = data;
        this.cropper_box_mark  = false;
      })
    },
    upload_img(e){
      let obj = e.target;
      let file = obj.files[0];
      let temArr = file.name.split(".");
      let file_suffix = temArr[temArr.length-1];
      if(file_suffix != 'jpg' && file_suffix != 'png' && file_suffix != 'jpeg'){
        alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
        return;
      }
      let reader = new FileReader();
      let _self = this;
      reader.onload = function (ev) {
        _self.cropperData.img = ev.target.result;		      
        _self.cropper_box_mark = true;
      }
      reader.readAsDataURL(file);
    },
    async get_check_code(){
      let res = await this.$http.api_get_checkcode();
      let {code,msg,data = {}} = res.data;
      if(code == 200){
        this.img_base64 = data.img;
        this.userInfo.code_token = data.token;
      }
    },
    async submit(){
      if(this.userInfo.user_name == '' || this.userInfo.user_id == "" || this.userInfo.user_pwd == ""){
        alert('注册失败，请填写完整表单');
        return;
      }
      if(this.userInfo.avatar == ''){
        alert("注册失败，请上传头像！");
        return;
      }
      if(this.userInfo.user_pwd.length < 5){
        alert("注册失败，密码最少为5位");
        return;
      }
      if(this.userInfo.user_pwd != this.userInfo.re_user_pwd){
        alert('注册失败，2次密码输入不一致!');
        return;
      }
      let res = await this.$http.api_add_user(this.userInfo);
      let {code,msg, data= {}} = res.data;
      alert(msg);
      if(code == 200){
        // 注册成功，将信息保存起来
        this.$store.commit('save', {
          _id: data._id,
          token: data.token,
          avatar: data.avatar,
          user_name: data.user_name
        })
        // 跳转路由到/home
        this.$router.push('/home');
      }
      this.get_check_code();
    }
  }
}
</script>


<style lang="scss">
.register-page {
  .avatar-box {
    flex: 1;
  }
  #upload-img {
    opacity: 0;
    display: none;
  }
  .upload-img-btn {
    width: 100px;
    border: 1px solid #ccc;
    display: block;
    padding: 5px 15px;
    transform: translateY(40%);
    margin: 5px auto;
    cursor: pointer;
  }
  .form-itme-avatar {
    height: auto;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .avatar-show {
    margin: 0 auto;
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .cropper-img-tool {
    position: absolute;
    z-index: 2;
    bottom: 20px;
    left: 0;
    text-align: center;
    width: 100%;
    .cropper-img-tool-btn {
      width: 140px;
      height: 50px;
      font-size: 18px;
      cursor: pointer;
      & + .cropper-img-tool-btn {
        margin-left: 50px;
      }
    }
  }
}
</style>

