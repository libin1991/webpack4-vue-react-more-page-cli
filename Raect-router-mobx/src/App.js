import React from 'react';
import './App.scss';
// 多个路由切换需要用 Switch 
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User'
import About from './pages/About'
import NoMatch from './pages/NoMatch'

function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact  path="/" component={Home}/>
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />
        <Redirect to="/" />
        <Route  component={NoMatch} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
