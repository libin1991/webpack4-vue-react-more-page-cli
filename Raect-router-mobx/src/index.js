import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss'

import './AndroidBack.js'

// 把store传递到子孙组件中， 这样就可以在组件中直接inject()
import {Provider} from 'mobx-react'
import AppStore from './mobx/appStore'

ReactDOM.render(
    <Provider store={AppStore}>
        <App />
    </Provider>, 
document.getElementById('root'));

//  +++++ 加入+++++
if (module.hot) {
    module.hot.decline('./App');
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


// 监听Android物理返回键，自定义处理方法
window.AndroidBack.listen(() => {
   alert('back');
   window.location.href="https://www.baidu.com/"
});
// 新增Android物理返回键监听事件，使用场景，比如：页面内弹出浮层，点击Android物理返回键，不是回退页面，而是关闭浮层
window.AndroidBack.push('close_modal', () => {
    // 关闭弹窗
    alert('关闭浮层');
});

 