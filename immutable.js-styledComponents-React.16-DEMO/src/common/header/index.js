import React, { Component } from 'react';

/** 使用 connect 使得 当前组件 连接 store */
import { connect } from 'react-redux';

/** 导入所有的 actionCreators , store/index.js */
import { actionCreators } from './store';
import { actionCreators as logoutActionCreators } from '../../pages/login/store'

/** 引入跳转路由 Link */
import { Link } from 'react-router-dom'

/** 导入局部样式 */
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  Addition,
  Button,
  SearchWrapper
} from './style'




/** 将只有一个 render() 方法的组件改装成一个 无状态组件，以提高性能 */
class Header extends Component {
  render(){
    /** 模块赋值
     */
    const { focused, list, handleInputBlur, handleInputFocus, login, logout } = this.props;
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className ='left active'>首页</NavItem>
          <NavItem className ='left'>下载App</NavItem>
          <NavItem className ='right'>
            <i className ='iconfont'>&#xe636;</i>
          </NavItem>
          {
            login ? <NavItem onClick={ logout } className ='right'>退出</NavItem> : <NavItem className ='right'><Link style={{color: '#000', textDecoration: 'none'}} to="/login">登录</Link></NavItem>
          }
          <SearchWrapper>
            <NavSearch
              className = {focused ? 'focused' : ''}
              onBlur = { handleInputBlur }
              onFocus = { () => handleInputFocus(list) }
            >
            </NavSearch>
            <i className = { focused ? 'focused iconfont zoom' : 'iconfont zoom' }>&#xe606;</i>
            { this.getSearchItem() }
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className ='writing'> <i className ='iconfont'>&#xe6a4;</i> 写文章</Button>
          </Link>
          <Button className ='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    );   
  }
   
  /** 当然也可以通过 display来控制显示隐藏 className= { props.focused ? 'showSearchInfo' : '' } */
  getSearchItem(){
    const { focused, list, page, totalPage, mouseIn, MouseEntered, MouseLeaved, toNextPage } = this.props;
    const newList = list.toJS(); /** immutable对象不支持list[i]这种形式，我们需要使用普通的js 对象 */
    const pageList = [];

    if( newList.length ){
      /** 如果 newList 中有值的时候，才将 newList 中添加值，否则，添加的都是空值，也就是 十个  undefined ! */
      for( let i = (page - 1) * 10 ; i < page * 10; i ++ ){
        /** style={{ display : newList[i] ? 'block' : 'none' }} 如果数据不是 10 的倍数，就不让 SearchInfoItem 标签显示  */
        pageList.push( <SearchInfoItem style={{ display : newList[i] ? 'block' : 'none' }} key= { Math.random() }>{ newList[i] }</SearchInfoItem> );
      }
    }

    if(focused || mouseIn){
      return (
        <SearchInfo onMouseEnter= { MouseEntered } onMouseLeave = { MouseLeaved }>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick= { () => { toNextPage(page,totalPage,this.spinIcon) } }>
              <i ref = { (icon) => { this.spinIcon = icon } } className="iconfont spin">&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            {/* 在react里面有两种展开循环数组的方式，一种是通过 .map()方法，然后就是下面这种方法 */}
            { pageList }
          </div>
        </SearchInfo>
      );
    }else{
      return null;
    }
  }
}

/** 这个方式是指 ， store 里面的数据如何映射到 props 上 , 这个state参数就是 store 里面的所有数据 */
const mapStateToProps = ( state ) => {
  /** 使用了 combineReducer 来管理了 所有组件的私有 reducer */
  return {
    /** immutable.js 和 redux-immutable.js 结合使用, 都是immutable 对象了  */
    focused : state.get('headerReducer').get('facused'),
    /** 等价写法 */
    list : state.getIn(['headerReducer','list']),
    page : state.getIn(['headerReducer','page']),
    totalPage : state.getIn(['headerReducer','totalPage']),
    mouseIn : state.getIn(['headerReducer','mouseIn']),
    login : state.getIn(['loginReducer', 'login'])
  };
};

/** 组件和 store 连接上之后，可以通过此方法来改变 store 里面的数据 ,这个 dispatch 参数就是  store.dispatch() 方法 */
const mapDispatchToProps = ( dispatch ) => {
  return {
    /** 输入框失焦的时候 */
    handleInputBlur(){
      dispatch( actionCreators.searchBlur() );
    },

    /** 输入框聚焦的时候, 聚焦的时候，使用redux-thunk 请求 searchInfo 数据 */
    handleInputFocus(list){
      list.size === 0 && dispatch(actionCreators.getList());
      // && 运算符，如果第一个表达式为false则返回第一个表达式的值，第二个表达式不执行
      
      dispatch( actionCreators.searchFocus() );
    },

    /** 鼠标移入 searchInfo ,改变 mouseIn 的状态 */
    MouseEntered(){
      dispatch( actionCreators.mouseInTrue(true) );
    },

    /** 鼠标移出的 searchInfo ,改变 mouseIn 的状态*/
    MouseLeaved(){
      dispatch( actionCreators.mouseInFalse(false) );
    },

    /** 点击换一批的时候，更新数据 */
    toNextPage(page,totalPage,spinIcon){
      let originAnggle = spinIcon.style.transform.replace(/[^0-9]/ig,'');
      /** 这里的正则表示 : 用空字符串代替所有不是 0 - 9 的数字，只留下数字部分 */
      if(originAnggle){
        originAnggle = parseInt(originAnggle,10);
      }else{
        originAnggle = 0;
      }
      spinIcon.style.transform = 'rotate(' + (originAnggle + 360) + 'deg)';
      if(page < totalPage){
        page ++;
      }else{
        page = 1;
      }
      dispatch( actionCreators.pageCounter(page) );
    },

    /** 退出 */
    logout () {
      console.log("logout")
      dispatch (logoutActionCreators.logout())
    }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(Header);