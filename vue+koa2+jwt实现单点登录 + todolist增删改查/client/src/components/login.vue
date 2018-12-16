<template>
  <div>
    <el-row>  <!--  :gutter="0" 响应式布局的元素左右间隔 默认为0-->
      <el-col :xs="{span: 20,offset: 2}" :sm="{span: 6,offset: 9}">
        <span>登录TodoList</span>
        <el-input v-model="username" placeholder="请输入账户"></el-input>
        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span: 20,offset: 2}" :sm="{span: 6,offset: 9}">
        <el-button class="ele-button" type="primary" @click="login">登录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span: 20,offset: 2}" :sm="{span: 6,offset: 9}">
        <el-button @click="registry">注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    mounted () {},
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        axios.post('/api/login', {
          username: this.username,
          password: this.password
        })
        .then((data) => {
          console.log(data)
          if (data.data.type === 1){ // 状态为1 说明 登录成功

            this.$message({
              message: data.data.text,
              type: 'success'
            })

            localStorage.setItem('token', data.data.token)
            this.$router.push('todoList')
          } else { // 状态为0 说明出现了一些错误
            this.$message.error(data.data.data)
          }

        })
        .catch((data) => {

        })
      },
      registry () {
        console.log(11);

        this.$router.push('registry')
      }
    }
  }
</script>

<style scoped>
.el-input {
  margin: 8px 0px;
}
.el-button {
  width: 100%;
  margin: 5px 0px;
}
.el-col span {
  font-size: 25px
}
</style>
