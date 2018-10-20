import styled from 'styled-components'

export const LoginWrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: #eee;
`;

export const LoginBox = styled.div`
  width: 400px;
  height: 180px;
  background-color: #fff;
  margin: 100px auto;
  padding-top: 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.1)
`;

export const Input = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  padding: 0 10px;
  color: #777;
  outline: none;
`;

export const Button = styled.button`
  display: block;
  width: 220px;
  height: 30px;
  line-height: 30px;
  background-color: #69c;
  color: #fff;
  border: 1px solid #69c;
  margin: 20px auto;
  border-radius: 15px;
  text-align: center;
  outline: none;
  cursor: pointer;
`;