import React, { Component } from 'react';

/** 使用 connect 将 store 和 组件 联系起来 */
import { connect } from 'react-redux';

import { actionCreators } from '../store'

/** 引入路由link */
import { Link } from 'react-router-dom'

import { 
  ListWrraper,
  ListInfo,
  LoadMore
} from '../style';

class List extends Component {

  render(){
    const { articleList, page, getMoreList } = this.props;
    return (
      <div>
        {
          articleList.map((item, index) => {
            return (
              <Link style={{color: '#000'}} key={index} to= {"/detail/" + item.get("id")}>
                <ListWrraper key= { index }>
                  <img className= "list-img" src= { item.get("imgUrl") } alt=""/>
                  <ListInfo>
                    <h3 className= "listTitle">{ item.get("title") }</h3>
                    <p className= "description">{ item.get("description") }</p>
                  </ListInfo>
                </ListWrraper>
              </Link>
            );
          })
        }
        <LoadMore onClick= { () => getMoreList(page) }>加载更多</LoadMore>
      </div>
    );
  }
}

const mapState = (state) => ({
  articleList: state.getIn(["homeReducer","articleList"]),
  page: state.getIn(["homeReducer","articlePage"])
});

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    const action = actionCreators.getMoreList(page);
    dispatch(action);
  }
});

export default connect( mapState, mapDispatch )(List);