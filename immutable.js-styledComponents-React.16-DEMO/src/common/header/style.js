import styled from 'styled-components';

/** 引入图片 */
import logoPic from '../../statics/logo.png';


export const HeaderWrapper = styled.div`
  position : relative;
  height : 56px;
  border-bottom : 1px solid #f0f0f0;
`;

export const Logo = styled.a.attrs({
  href : '/'
})`
  position : absolute;
  top : 0;
  left : 0;
  display : block;
  width : 100px;
  height : 56px;
  background : url(${logoPic});
  background-size : contain;
`;

export const Nav = styled.div`
  width : 960px;
  height : 100%;
  margin : 0 auto;
  padding-right : 70px;
  box-sizing : border-box;
`;

// box-sizing : 为元素指定的任何内边距和边框都将在   已设定  的宽度和高度内进行绘制 / 右侧空出 70px,但是宽度还是 960px;


export const NavItem = styled.div`
  line-height : 56px;
  padding : 0 15px;
  font-size : 17px;
  color : #333;
  cursor: pointer;
  &.left{
    float : left;
  }
  &.right{
    float : right;
    color : #969696;
  }
  &.active{
    color : #ea6f5a;
  }
`;

export const SearchWrapper = styled.div`
  float : left;
  position : relative;
  & .zoom {
    position : absolute;
    bottom : 0px;
    right : 0px;
    width :38px;
    text-align : center;
    line-height : 38px;
    border-radius : 19px;
    &.focused{
      background-color : #000;
      color : #fff;
    }
  }
`;

export const SearchInfo = styled.div`
  position : absolute;
  top : 56px;
  left : 0;
  padding : 0 20px;
  width : 200px;
  height : auto;
  box-shadow : 0 0 8px rgba(0,0,0,.2);
  background-color: #fff;
`;
export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`;
export const SearchInfoSwitch = styled.span`
  cursor: pointer;
  float: right;
  font-size: 13px;
  & .spin{
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 4px;
    transition: all .2s ease-in;
    tranform-origin: center center;
  }
`;
export const SearchInfoItem = styled.a.attrs({
  href : '#'
})`
  display: block;
  float: left;
  line-height: 20px;
  padding: 0 5px;
  margin-right: 10px;
  margin-bottom: 15px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #333;
  border-radius: 2px;
  text-decoration: none;
`;


export const NavSearch = styled.input.attrs({
  placeholder : '搜索'
})`
  width : 160px
  padding : 0 35px 0 20px;
  height : 38px;
  border-radius : 19px;
  outline : none;
  border : none;
  margin-top : 9px;
  box-sizing :border-box;
  background-color : #eee;
  font-size : 14px;
  color : #777;
  transition:width 1s;
  &::placeholder {
    color : #999;
  }
  &.focused {
    width : 240px;
    transition:width 1s;
  }
`;

export const Addition = styled.div`
  position : absolute;
  top : 0;
  right : 0;
  height : 56px;
`;

export const Button = styled.button`
  height : 38px;
  padding : 0 20px;
  margin-top : 9px;
  margin-right : 20px;
  border : 1px solid #ea6f5a;
  border-radius :19px;
  outline : none;
  font-size : 14px;
  background-color : #fff;
  cursor : pointer;
  &.writing {
    color : #fff;
    background-color : #ea6f5a;
  }
  &.reg {
    color : #ea6f5a;
  }
`;