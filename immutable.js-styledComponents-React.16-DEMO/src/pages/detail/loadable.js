/**
 * react-loadable 第三方模块的作用是 : 
 * 异步加载组件，也就是说，在某个页面中，只会加载当前页面所用到的js文件，而没有用到的组件不会加载进来
 */

import React from 'react';

import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading: () => {
    return (
      <div>
        正在加载detail组件中的js文件，请稍等...
      </div>
    );
  },
});

export default () => {
  return <LoadableComponent />;
};

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>;
//   }
// };