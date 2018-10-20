import React, { Component } from 'react';

import { connect } from 'react-redux';

import { 
  WriterWrrapper,
  RefreshWriter,
  WriterItem
} from '../style';

class Writer extends Component {
  render(){
    const { writerList } = this.props;
    return (
      <WriterWrrapper>
        热门搜索
        <RefreshWriter>
          <i className="iconfont spin">&#xe851;</i>
          换一批
        </RefreshWriter>
        <div className="focusWriter">
          {
            writerList.map((item) => {
              return (
                <WriterItem key= { item.get("id") }>
                  <img className="writerImg" src= { item.get("imgUrl") } alt=""/>
                  <p className="writerName">{ item.get("name") }<span>+关注</span></p>
                  <p className="writerInfo">写了{ item.get("writes") }k字，{ item.get("writes") }k喜欢</p>
                </WriterItem>
              );
            })
          }
        </div>
      </WriterWrrapper>
    );
  }
}

const mapState = (state) => ({
  writerList : state.getIn(["homeReducer","writerList"])
});

export default connect( mapState, null)(Writer);