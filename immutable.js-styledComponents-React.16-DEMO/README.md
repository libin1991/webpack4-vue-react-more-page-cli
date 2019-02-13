### [Immutable.js了解一下？](https://juejin.im/post/5c62ae34e51d450aab0a373f)
一.使用 styled-components 来管理react中的样式文件
    npm install styled-components --save-dev

    使用 styled-components 创建全局样式
        injectGlobal`
          @到网上搜索 reset.css, 将其copy至此!使得项目在所有浏览器上做到统一
        `
    注意 : 写样式的时候不需要加引号 ,如 : width : 100%;
        export const Logo = styled.a.attrs({
          href : '/'  /* 在这里写属性 */
        })`
          position : absolute;
        `

二.可以使用 react-transition-group 来实现动画效果
    使用教程，可以在 github 上面搜索

三.使用 redux 以及 react-redux 来管理 state
    /** 使用 connect 使得 当前组件 连接 store */
    import { connect } from 'react-redux';
    export default connect( mapStateToProps, mapDispatchToProps )(Header);

    /** 通过 combineReducer 来整合所有组件的私有 reducer */
    /** 每一个组件都要创建一个 reducer ,这个 reducer 包含了组件的所有数据和对数据的操作*/
    /** 优点 : 简化代码，提升查询速度，性能优化 */
    import { combineReducers } from 'redux';

四.使用 immutable.js 和 redux-immutable 来保证 state 不会被改变

    import { fromJS } from 'immutable';
    const defaultState = fromJS({
        facused : false
    });

    /* combineReducers 也可以从 redux-immutable 中引入 */
    import { combineReducers } from 'redux-immutable';

五. 使用redux-thunk 及 axios 来处理异步请求

    使用 redux-thunk 来处理异步请求，派发 action 时，dispatch 会自动识别 action 参数，如果action是函数就会自动执行此函数
    如果action 是函数的话，那么action的参数就是dispatch 

    注意 : 使用create-react-app来建立工程，底层也是建立在 node 服务的基础之上的
    当我们请求数据的时候，它会先到我们的src 目录下寻找是否有对应的路由，其次还会到 public 目录下寻找
    所以我们可以将我们需要请求的 .json 数据放到 public目录下，可以通过 localhost:3000 访问到！

六. react-router-dom ( react-router 4.0.0 以上 )
    npm install react-router-dom --save-dev
    import { BroswerRouter, Route } from 'react-router-dom';

七. 组件嵌套
    通过路由Route中的 component 
    <BrowserRouter>
        <div>
            <Route path='/' exact component= { Home } ></Route>
            <Route path='/detail' exact component= { Detail } ></Route>
        </div>
    </BrowserRouter>

    这样，子组件就都能访问到父组件中的props了，别忘了，我们的组件都是写在 <Provider store= { store }> 标签下

    1.给组件写单独的 小 reducer,方便管理 state，导入到最大的reducer中通过 combineReducers 整合到一起

    2.使得组件跟 store 建立连接 ，从 react-redux 中导入 connect( toState, toDispatch )(组件)
      如果不需要改变state里面的内容，我们可以不用传入第二个参数
    
    3.最后，我们通过 this.props.xxx 来拿到 store 里面的值~

八. 登录/退出功能
    import { Redirect } from 'react-router-dom'  重定向路由
    return <Redirect to="/login"/>

    如果我们需要改变别的组件里面的数据，那么我们就需要引入别的组件里面的actionCreators，将action派发到别的reducer中，
    从而改变别的组件里面的数据

九.下载react-loadable第三方模块，来处理异步组件问题
    npm install react-loadable来处理异步组件加载

    import React from 'react';
    import Loadable from 'react-loadable';

    const LoadableComponent = Loadable({
        //loader 中的import 是导入当前目录下的index.js,也就是你需要展示的文件
        //loading 表示在页面加载完成之前需要展示的东西，可以写一个好看点的组件，或者loading动画
        loader: () => import('./'),
        loading: () => {
            return (
                <div>
                    正在加载detail组件中的js文件，请稍等...
                </div>
            );
        },
    });

    /*
        可以使用无状态组件来代替下面的 export default
        export default () => {
            return <LoadableComponent />;
        };
    */

    export default class App extends React.Component {
        render() {
            return <LoadableComponent/>;
        }
    };

十. withRouter
    import { withRouter } from 'react-router-dom'

    当我们使用了react-loadable这种第三方模块之后，我们引入就不是原本的组件了，而是引入了 loadable.js 文件
    那么我们还是使用之前通过路由来获取参数的方式就会报错了 
    ( this.props.match.params.id )

    所以我们要是用 withRouter 
    它可以使得组件能够获取路由中所有的参数和内容
    export default connect(mapState, mapDispatch)(withRouter(Detail));
        

