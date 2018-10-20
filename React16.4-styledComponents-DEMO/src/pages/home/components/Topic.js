import React, { Component } from 'react';

/** 使得组件和 store 作连接 */
import { connect } from 'react-redux';

/** 引入样式文件，如果内容较少，就不必单独写样式文件了 */
import {
  TopicWrraper,
  TopicItem
} from '../style';

class Topic extends Component {
  render(){
    return (
      <TopicWrraper>
        {
          this.props.list.map((item) => {
            return (
              <TopicItem key= { item.get("id") }>

                {/* 通过 immutable 创建的对象，其下所有的对象都是 immutable 对象，需要通过 get/set 方法来获取或设置 */}

                <img className= "topic-img" src= { item.get("imgUrl") } alt=""/>
                { item.get("title") }
              </TopicItem>
            );
          })
        }
      </TopicWrraper>
    );
  }
}

const mapStateToProps = ( state ) => ({
  list: state.get("homeReducer").get("list")
});

/** 如果不需要改变 store 里面的数据，就不用穿第二个参数 */
export default connect( mapStateToProps, null )(Topic);