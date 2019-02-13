import styled from 'styled-components';

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 1px auto;
  padding-bottom: 48px;
`;
export const HomeLeft = styled.div`
  float: left;
  width: 625px;
  margin-left: 15px;
  padding-top: 20px;
  .banner-img {
    width: 625px;
    height: 270px;
  }
`;
export const HomeRight = styled.div`
  float: left;
  width: 240px;
  margin-left: 15px;
  padding-top: 20px;
`;



/** Topic 部分的样式 */
export const TopicWrraper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -18px;
`;
export const TopicItem = styled.div`
  float: left;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  background-color: #f7f7f7;
  border-radius: 4px;
  padding-right: 10px;
  margin-left: 18px;
  margin-bottom: 18px;

  .topic-img {
    display: block;
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;


/** list 部分样式 */
export const ListWrraper = styled.div`
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
  padding: 20px 0;
  .list-img {
    display: block;
    float: right;
    width: 125px;
    height: 100px;
    border-radius: 10px;
  }
`;
export const ListInfo = styled.div`
  border-top: 1px solid #f7f7f7;
  float: left;
  width: 500px;
  .listTitle {
    font-size: 18px;
    line-height: 27px;
    font-weight: bold;
  }
  .description {
    font-size: 13px;
    line-height: 24px;
    color: #999;
  }
`;

/** 右侧推荐部分样式 */
export const RecWrrapper = styled.div`
  width: 240px;
  height: auto;
`;
export const RecItem = styled.div`
  .rec-img {
    width: 240px;
    margin-bottom: 10px;
  }
`;

/** 左侧作者部分样式 */
export const WriterWrrapper = styled.div`
  width : 240px;
  background-color: #fff;
  padding: 20px 0px;
  overflow: hidden;
  .focusWriter {
    margin-top: 16px;
  }
`;
export const RefreshWriter = styled.span`
  float: right;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`;
export const WriterItem = styled.div`
  width: 100%;
  overflow: hidden;
  line-height: 24px;
  margin-bottom: 24px;
  .writerImg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    float: left;
    margin-right: 6px;
  }
  .writerName {
    overflow: hidden;
    font-size: 14px;
    span {
      float: right;
      color: #42c02e;
    }
  }
  .writerInfo {
    font-size: 13px;
    color: #969696;
  }
`;

/** 加载更多按钮 */
export const LoadMore = styled.div`
  width: 100%;
  height: 40px;
  margin: 30px 0;
  background-color: #a5a5a5;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  cursor: pointer;
`;