import styled from 'styled-components';

export const DetailWrapper = styled.div`
  overflow: hidden;
  width: 620px;
  margin: 1px auto;
  padding-bottom: 100px;
`;

export const Header = styled.div`
  margin: 50px 0 20px 0;
  line-height: 44px;
  font-size: 34px;
  font-weight: bold;
`;

export const Content = styled.div`
  width: 100%;
  padding-bottom: 50px;
  img {
    width: 100%;
  }
  p {
    text-indent: 2em;
    margin: 25px 0;
    font-size: 16px;
    line-height: 30px;
    color: #2f2f2f;
  }
  b {
    font-weight: bold;
  }
`;