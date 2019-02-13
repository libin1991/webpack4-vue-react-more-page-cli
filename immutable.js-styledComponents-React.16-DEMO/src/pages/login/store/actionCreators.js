
import axios from 'axios'

import { constants } from '../store'

const changeLogin = () => ({
  type: constants.CHANEG_LOGIN,
  value: true
})

export const userLogin = (account, password) => {
  return (dispacth) => {
    axios.get("/api/login.json?account=" + account + "&password=" + password).then(res => {
      console.log(res);
      let result = res.data.data;
      if(result.admin === account && result.password === password){
        dispacth(changeLogin())
      }else{
        alert("登陆失败!");
      }
    })
  }
}

/** 退出 */
export const logout = () => ({
  type: constants.LOGOUT,
  value: false
})