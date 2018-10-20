import React, { Component } from 'react';

/** 使用 react-redux */
import { Provider } from 'react-redux';

/** 使用路由 react-router-dom */
import { BrowserRouter, Route } from 'react-router-dom';

/** 引入 store.js */
import store from './store';

/** 引入组件,配置路由 */
import Header from './common/header/index.js';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login'
import Write from './pages/write'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store ={ store }>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='/' exact component= { Home } ></Route>
            <Route path='/login' exact component= { Login } ></Route>
            <Route path='/write' exact component= { Write } ></Route>
            <Route path='/detail/:id' exact component= { Detail } ></Route>
          </div>
        </BrowserRouter>
      </Provider>
      </div>
    );
  }
}

export default App;
