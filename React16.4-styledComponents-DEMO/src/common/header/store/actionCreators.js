/** 使用constants 来管理 action.type */
import * as constants from './constants';

import { fromJS } from 'immutable';

import Axios from 'axios';


const changeList = (data) => ({
  type : constants.GET_SEARCH_DATA,
  /** 将普通的数组转为 immutable 数组, 因为我们创建的 state 是immutable 对象，而数组也是js 对象 */
  data : fromJS(data),
  totalPage : Math.ceil( data.length / 10 )
});


/** 使用 actionCreators 来创建 action */
export const searchFocus = () => ({
  type : constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type : constants.SEARCH_BLUR
});

export const getList = () => {
  return ( dispatch ) => {
    /** 在这里发 axios 请求 */
    if(true){
      Axios.get('api/headerList.json').then( res => {
        /** 通过 actionCreators 来创建 action  */
        const action = changeList( res.data.headerList );
        dispatch(action);
      }).catch (err => {
        console.log("请求数据出错!",err);
      })

    }
  }
}

/** 改变 mouseIn 的状态 */

export const mouseInTrue = (data) => ({
  type : constants.MOUSE_IN_TRUE,
  data
});
export const mouseInFalse = (data) => ({
  type : constants.MOUSE_IN_FALSE,
  data
});

/** 改变 store.state 中的 page 的值 ! */
export const pageCounter = (currentPage) => ({
  type : constants.PAGE_COUNTER,
  currentPage
})
