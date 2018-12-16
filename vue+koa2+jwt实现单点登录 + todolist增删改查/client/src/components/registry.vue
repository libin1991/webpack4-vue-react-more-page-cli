<template>
  <div>
    <el-row>
      <el-col :xs="{span: 22, offset: 2}" :sm="{span: 6, offset: 9}">
        <span class="title">注册</span>

        <el-row class="row-position">
          <el-input v-model="username" placeholder="请输入注册的账户" @focus="userfocus"></el-input>
          <el-alert :title="userErros.username" type="error" :closable="false" v-show="!userErros.userStatus && isuserShow" show-icon></el-alert>
          <el-alert :title="userErros.username" type="success" :closable="false" v-show="userErros.userStatus" show-icon></el-alert>
        </el-row>

        <el-row class="row-position">
          <el-input v-model="password" type="password" placeholder="请输入注册的密码" @focus="passfocus"></el-input>
          <el-alert :title="userErros.password" type="error" :closable="false" v-show="!userErros.passStatus && ispassShow" show-icon></el-alert>
          <el-alert :title="userErros.password" type="success" :closable="false" v-show="userErros.passStatus" show-icon></el-alert>
        </el-row>

      </el-col>
      <el-col :xs="{span: 22, offset: 2}" :sm="{span: 6, offset: 9}">
        <el-button class="ele-button" type="primary" @click="regist" :disabled='userErros.status'>注册</el-button>
        <!-- :disabled="userErros.status?'disabled' : '' " -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        isuserShow: false,
        ispassShow: false
      }
    },
    computed : {
      userErros () {
        let username, password, userStatus, passStatus, status
        let userLength = this.username.split('').length
        let passLength = this.password.split('').length
        if (userLength < 5) { // 用户名长度小于6
          username = '账户不可以小于5位',
          userStatus = false
        } else {
          username = '通过',
          userStatus = true
        }

        if (passLength < 5) {
          password = '密码不可以小于5位',
          passStatus = false
        } else {
          password = '通过',
          passStatus = true
        }
        if (userLength < 5 || passLength < 5) {
          status = true
        } else {
          status = false
        }
        return {
          username,
          password,
          userStatus,
          passStatus,
          status
        }
      }
    },
    methods: {
      regist () {
        this.$axios.post('/api/regist', {
          username: this.username,
          password: this.password
        })
        .then((data) => {
          if (data.data.type === 1){
            this.$message({
              message: data.data.data,
              type: 'success'
            })
            this.$router.push('login')
          } else {
            this.$message.error(data.data.data)
          }
        })
        .catch((data) => {
          this.$message.error(data.data.data)
        })
      },
      userfocus () {
        this.isuserShow = true
      },
      passfocus () {
        this.ispassShow = true
      }
    }
  }
</script>

<style scoped>
.el-input {
  margin: 8px 0px;

}
.row-position {
  position: relative;
}
.row-position .el-alert {
  position: absolute;
  top: 10px;
  right: -200px;
  width: 50%;
}
.el-col .title {
  font-size: 25px;
}
.el-button {
  width: 100%;
  margin-top: 8px;
}
</style>
