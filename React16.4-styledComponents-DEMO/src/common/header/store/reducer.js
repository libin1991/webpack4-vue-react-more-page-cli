
import * as constants from './constants';

/** 使用facebook提供的 immutable.js ,控制state 无法被改变 */
/** 如果不使用 immutable.js ,那么我们就要使用手动的方法来保证state不会被修改 */
/** JSON.parse(JSON.strigify()) */
import { fromJS } from 'immutable';

const defaultState = fromJS({
  facused : false,
  mouseIn : false,
  list : [],
  page : 1,
  totalPage : 1
});

/**
 * 导出一个纯函数
 * 纯函数 : 给定固定的输出，就给定固定的输出，同时不能有副作用，参数不能变化
 */

export default ( state = defaultState , action ) => {
  switch(action.type){
    case constants.SEARCH_FOCUS :
      return state.set("facused",true);
    case constants.SEARCH_BLUR :
      return state.set("facused",false);
    case constants.GET_SEARCH_DATA :
      // return state.set("list",action.data).set("totalPage",action.totalPage);
      //如果我们需要同时设置多个state属性的话，可以使用 state.merge({})方法，性能更好，因为set()方法会每调用一次就返回一个新的state
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      });
    case constants.MOUSE_IN_TRUE :
      return state.set("mouseIn",action.data);
    case constants.MOUSE_IN_FALSE :
      return state.set("mouseIn",action.data);
    case constants.PAGE_COUNTER :
      return state.set("page", action.currentPage);
    default :
      return state;
  }
};
