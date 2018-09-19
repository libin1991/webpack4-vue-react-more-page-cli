<template>
  <div class="comment-item">
    <div class="user-info">
      <div class="avatar-box">
        <img :src=item.user_id.avatar alt="头像">
      </div>
      <div class="other-info">
        <p class="user-name">{{item.user_id.user_name}}</p>
        <p class="create-time">{{format(item.create_time)}}</p>
      </div>
    </div>
    <div class="comment-content" v-text="item.content">
    </div>
    <div class="del-box" v-show="item.user_id._id == $store.state.user._id">
      <span class="del-btn" @click="del_comment">删除</span>
    </div>
  </div>
</template>

<script>
import {format_date} from '@/plugins/utils'
export default {
  props: ['item'],
  computed: {
    format(val){
      return function(val){
        return format_date(val);
      }
    }
  },
  methods: {
    async del_comment(){
      if(confirm("确定删除此条留言吗？")){
        let res = await this.$http.api_del_leave(this.item._id);
        let {code,msg} = res.data;
        alert(msg);
        if(code == 200){
          this.$emit("delete_this",this.item._id);
        }
      }
    }
  }
}
</script>


<style lang="scss">
.comment-item {
  width: 800px;
  margin: 20px auto;
  text-align: left;
  box-shadow: 0 0 10px #ccc;
  padding: 10px 5px;
  box-sizing: border-box;
  transition: box-shadow .6s;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px #ccc;
  }
  .user-info {
    display: flex;
    .avatar-box {
      width: 60px;
      min-width: 60px;
      height: 60px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .other-info {
      flex: 1;
      padding-left: 10px;
      .user-name {
        font-size: 22px;
        line-height: 40px;
        font-weight: bold;
      }
      .create-time {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .comment-content {
    padding: 10px 5px;
    font-size: 14px;
    word-break: break-all;
  }
  .del-box {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 50px;
    transition: width .6s;
    font-size: 18px;
    background-color: rgba(245,108,108,.8);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px #ccc;
    &:hover {
      width: 100%;
    }
    .del-btn {
      &:hover {
        font-weight: bold;
      }
    }
  }
}
</style>
