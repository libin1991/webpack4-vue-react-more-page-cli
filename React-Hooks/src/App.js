// import React from 'react';
import logo from './logo.svg';
import './App.css';
import React, {
	// useHooks,
	useState,
	useEffect,
	useContext,
	useReducer,
	useRef
} from 'react'

const ThemeContext = React.createContext({
	background: '#282c34',
	color: '#61dafb'
});

/**
 * 监控浏览器变化
 * @return {number} innerWidth 返回当前窗口宽度
 * **/
const useWindowWith = () => {

	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const handleResize = () => setInnerWidth(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return() => {
			window.removeEventListener('resize', handleResize)
		}
	})
	return innerWidth
}

/**
 * 计数
 * @param  {number} initialState 初始值
 * @return {number} count 值
 * @return {function} setCount 改变值的方法
 * */
const useCount = (initialState) => {
	const [count, setCount] = useState(initialState);
	useEffect(() => {
		console.log('change')
	}, [count])
	return [count, setCount]
}

/**
 * count-reducer
 * * */

const initialState = {
	count: 0
};

function reducer(state, action) {
	switch(action.type) {
		case 'reset':
			return initialState;
		case 'increment':
			return {
				count: state.count + 1
			};
		case 'decrement':
			return {
				count: state.count - 1
			};
		default:
			return state
	}
}

/**
 * 点击获取焦点
 * @param  {number} initial 初始值
 * @return {object} ref 当前的ref对象
 * @return {function} focusHandle 使用该ref对象的函数
 * */
function useRefHandle(initial) {
	let ref = useRef(initial)
	let focusHandle = () => ref.current.focus();
	return [ref, focusHandle]
}

const App = (props) => {
	const innerWidth = useWindowWith()
	const [count, setCount] = useCount(0);
	const {
		color,
		background
	} = useContext(ThemeContext);
	const [state, dispatch] = useReducer(reducer, initialState)
	let [inputEl, focusHandle] = useRefHandle(null);
	console.log('render number')
	return(
		<div className="App">
        {/* useContext demo */}
        <header className="App-header" style={{backgroundColor:background}}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>  react hook demo </p>

          {/* useState demo */}
          <p>count:{count}</p>
          <button onClick={()=>setCount(count+1)} className="App-button"  >点击</button>

          {/* useReducer demo */}
          <p>reducer count:{state.count}</p>
          <div  className="App-button-group" >
            <button  onClick={()=>dispatch({type: 'increment'})} >increment</button>
            <button  onClick={()=>dispatch({type: 'decrement'})} >decrement</button>
            <button  onClick={()=>dispatch({type: 'reset'})} >reset</button>
          </div>

          {/* useEffect demo */}
          <p>当前屏幕宽度：{innerWidth}</p>

          {/* useRef demo */}
          <p>
          useRef: <input type='text' ref={inputEl}/><button onClick={focusHandle}>搜索</button>
          </p>
          
          {/* useContext demo */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{color:color}}
          >
            Learn React
          </a>
        </header>
      </div>
	);

}

export default App