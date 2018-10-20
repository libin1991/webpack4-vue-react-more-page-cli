
import { fromJS } from 'immutable';
import { CHANGE_HOME_DATA, ADD_ARTICLE_LIST } from './actionTypes'

const defaultState = fromJS({
  list: [],
  articleList : [],
  recomendList: [],
  writerList: [],
  articlePage: 1
});

export default ( state = defaultState , action ) => {
  switch(action.type){
    case CHANGE_HOME_DATA:
      return state.merge({
        list: fromJS(action.list),
        articleList: fromJS(action.articleList),
        recomendList: fromJS(action.recomendList),
        writerList: fromJS(action.writerList)
      });
    case ADD_ARTICLE_LIST:
      return state.merge({
        articleList: state.get("articleList").concat(action.list),
        articlePage: action.articlePage
      });
    default :
      return state;
  }
};
