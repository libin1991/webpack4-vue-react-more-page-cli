import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import { actionCreators } from './store'

import { 
  DetailWrapper,
  Header,
  Content
} from './style'

class Detail extends Component {
  render(){
    return (
      <div>
        <DetailWrapper>
          <Header>{ this.props.title }</Header>
          <Content 
            dangerouslySetInnerHTML={{ __html: this.props.content}} 
          />
        </DetailWrapper>
      </div>
    );
  }
  componentDidMount () {
    this.props.getDetails(this.props.match.params.id)
  }
}

const mapState = (state) => ({
  title: state.getIn(['detailReducer','title']),
  content: state.getIn(['detailReducer', 'content'])
})

const mapDispatch = (dispatch) => ({
  getDetails (id) {
    dispatch(actionCreators.getDetails(id))
  }
})

export default connect(mapState, mapDispatch)(withRouter(Detail));