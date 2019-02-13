
/** 通过 combineReducer 来整合所有组件的私有 reducer */
/** 每一个组件都要创建一个 reducer ,这个 reducer 包含了组件的所有数据和对数据的操作*/
/** 优点 : 简化代码，提升查询速度，性能优化 */
// import { combineReducers } from 'redux';


/**使用 redux-immutable  */
import { combineReducers } from 'redux-immutable';

import { reducer as headerReducer } from '../common/header/store';

import { reducer as homeReducer } from '../pages/home/store';

import { reducer as detailReducer } from '../pages/detail/store'

import { reducer as loginReducer} from '../pages/login/store'

export default combineReducers({
  headerReducer,
  homeReducer,
  detailReducer,
  loginReducer
});
