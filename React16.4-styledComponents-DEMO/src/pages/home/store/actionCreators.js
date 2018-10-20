

import Axios from 'axios';
import { fromJS } from 'immutable';
import { CHANGE_HOME_DATA, ADD_ARTICLE_LIST } from './actionTypes'

const getHomeAction = (result) => ({
  type: CHANGE_HOME_DATA,
  articleList: result.articleList,
  list: result.list,
  recomendList: result.recomendList,
  writerList: result.writerList 
})

const getArticleList = (articleList,articlePage) => ({
  type: ADD_ARTICLE_LIST,
  list: fromJS(articleList),
  articlePage
});

export const getHomeData = () => {
  return (dispatch) => {
    Axios.get("api/home.json").then( res => {
        const action = getHomeAction(res.data.data);
        dispatch(action);
      }).catch( err => {
        console.log("网络请求错误!",err);
      })
  }
};

export const getMoreList = (page) => {
  return (dispatch) => {
    Axios.get("api/homeList.json?page=" + page ).then( res => {
      let result = res.data.data;
      const action = getArticleList(result, page + 1 );
      dispatch(action);
    })
  }
};