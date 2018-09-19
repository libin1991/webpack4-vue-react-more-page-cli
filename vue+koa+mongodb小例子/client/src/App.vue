<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {padding: 0;margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form {
  width: 600px;
  margin: auto;
  box-sizing: border-box;
  box-shadow: 0 0 30px #ccc;
  padding: 0 30px 0 15px;
  .form-title {
    font-size: 26px;
    font-weight: bold;
    height: 80px;
    line-height: 80px;
  }
  .form-item {
    height: 40px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .form-item-title {
    width: 120px;
    display: block;
    line-height: 40px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .form-input {
    flex: 1;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0 5px;
    border: none;
    border-bottom: 1px dotted #ccc;
    outline: none;
    transition: border-bottom-color .3s;
    &:focus {
      border-bottom-color: red;
    }
  }
  .form-checkcode {
    width: 120px;
    cursor: pointer;
  }
  .form-submit-btn {
    padding: 0 40px;
    font-size: 22px;
    cursor: pointer;
  }
  .form-bottom {
    height: 40px;
    padding: 10px 0;
    .form-jump-link {
      color: #666;
      text-decoration: none;
      transition: color .3s;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
