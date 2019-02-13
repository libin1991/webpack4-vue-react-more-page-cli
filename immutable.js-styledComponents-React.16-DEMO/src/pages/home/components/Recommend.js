import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  RecWrrapper,
  RecItem
} from '../style'; 

class Recommend extends Component {
  render(){
    //const { recomendList } = this.props;
    return (
      <RecWrrapper>
        {
          this.props.recomendList.map( (item) => {
            return ( <RecItem key= {item.get("id")}> <img className= "rec-img" src= { item.get("imgUrl") } alt=""/> </RecItem> );
          })
        }
      </RecWrrapper>
    );
  }
}

const mapState = (state) => ({
  recomendList : state.getIn(["homeReducer","recomendList"])
})

export default connect( mapState, null)(Recommend);