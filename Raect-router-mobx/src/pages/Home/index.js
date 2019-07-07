import React from 'react';
import logo from '../../logo.svg';
import './index.scss';
import Footer from "../../publicComponents/Footer"
import Axios from "../../utils/request";
import { observer, inject } from "mobx-react"

/***
 * 有了observable来代表state，有了action来修改state，
 * 那么UI怎么消费state，并且响应state的变化呢。在react应用中，需要引入npm包mobx-react。
 * 它提供一个observer()方法来绑定react和mobx。observer()包裹一个react component从而生成一个高阶component(HoC)来自动响应observable state的改变。
 * observer()会自动跟踪render方法里面消费的那些observable state。
 * 只要其中任何的observable发生了改变，re-render就会发生。
 */


// 使store跟component链接起来 注入store
@inject('store')
// 装饰器decorator来封装component
@observer
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.addCount = this.addCount.bind(this)
  }
  componentDidMount () {
    Axios.get('/h5/misc/config').then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err)
    })
  }
  addCount() {
    const { store } = this.props
    store.addCount()
  }
  render() {
    const { store } = this.props
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />      
          <p onClick={this.addCount}>{store.counter}</p>
          <a
            className="Home-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn ss
          </a>
        </header>
        <Footer  History={this.props.history} selectedTab='blueTab' />
      </div>
    );
  }
}

export default Home;