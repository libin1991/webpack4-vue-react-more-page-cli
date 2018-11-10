## 前言

react作为前端目前很火的框架，拥有者无数的开发者和活跃的社区，但作为开发者在用react开发的时候，你是否遇到过以下的问题：

- 复用一个有状态的组件太难

  react的核心思想推荐将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。
  
  但实践发现很多组件很冗长且带有状态，不好进行拆分，复用困难大

  于是官方推荐使用HOC

- 生命周期钩子函数里的逻辑太乱

  我们希望一个函数只做一件事，但生命周期钩子函数中，其实同时在做多件事情。同时，在某种情景下，我们需要在componentDidMount和componentDidUpdate做同样的事情

- class

  我们用class来创建一个组件的时候，最重要的就是给函数绑定this

  ```js
    //不管是
    this.handleClick = this.handleClick.bind(this)
    //还是
    const handleClick = ()=>{}
    //或者是
    <button onClick={() => this.handleClick(e)}> 
  ```
  一旦忘了绑定this，就会报错.所以我们更偏爱无状态组件

  但需求一迭代，无状态组件变成有状态组件，意味着我们就要重写该组件，用class来代替

所以，在美国时间10月26号React Conf 2018上,React 官方宣布 React v16.7.0-alpha 将引入名为 Hooks 的新特性,它使得在函数中也可以使用react的生命周期和状态。

## 常用的hook

- useState

  useState可能是未来使用最多的一个hook函数，它的作用就是用来声明状态变量。
  
  useState这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第[0]项是当前当前的状态值，第[1]项是可以改变状态值的方法函数,类似setState，但不是setState。

  this.setState做的是合并状态后返回一个新状态，而useState是直接替换老状态后返回新状态，且相互独立

  ```js
    ...
    const [count, setCount] = useState(initialState);

    ...
    <p>count:{count}</p>
    <button onClick={()=>setCount(count+1)} className="App-button"  >点击</button>
  ```

- useEffect

  useEffect相当于componentDidMount，componentDidUpdate的集合，而在返回（return）的函数中，相当于componentWillUnmount。
  
  我们可以通过在useEffect设置第二个参数来设置监听的值，类型为数组。传入后，只有数组里面的值变化了，才会执行useEffect，从而来提高性能，如何传入一个空数组 ，那么该 effect 只会在组件 mount 和 unmount 时期执行。

  但和生命周期不一样的是，

  - useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图,也就是说这些函数是异步执行的
  - react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数
  - componentWillUnmount只会在组件被销毁前执行一次而已，而useEffect里的函数，每次组件渲染后都会执行一遍

  ```js
    useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return ()=>{
          window.removeEventListener('resize',handleResize)
        }
    })
  ```

- useContext

  useContext其实是简化了使用createContext的流程,更加优雅

  ```js
  ...
  const ThemeContext = React.createContext({
    background: '#282c34',
    color: '#61dafb'
  });

  ...
  const {color,background} = useContext(ThemeContext);

  ...
  <header className="App-header" style={{backgroundColor:background}}>

  ```
- useReducer 提供一个简单化的redux

```js


const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state
  }
}
...
const [state, dispatch] = useReducer(reducer, initialState)

...

<p>reducer count:{state.count}</p>
<div  className="App-button-group" >
  <button  onClick={()=>dispatch({type: 'increment'})} >increment</button>
  <button  onClick={()=>dispatch({type: 'decrement'})} >decrement</button>
  <button  onClick={()=>dispatch({type: 'reset'})} >reset</button>
</div>
          
```

- useRef 更加优雅的去获取ref对象

```js
  function useRefHandle(initial){
    let ref = useRef(initial)
    let focusHandle = ()=>ref.current.focus();
    return [ref,focusHandle]
  }
  ...  
  let [inputEl,focusHandle] = useRefHandle(null);
  ...
  <p>
    useRef: <input type='text' ref={inputEl}/><button onClick={focusHandle}>搜索</button>
  </p>
```

## hook的规则
- 只能在顶层调用Hooks。不要在循环，条件或嵌套函数中调用Hook。确保hook按顺序执行
- 仅从React功能组件调用Hooks，或在自定义的hook中调用。不要从常规JavaScript函数中调用Hook。 

## 自定义hook

react hook不仅提供了一些常用方法的hook来让组件写的更加优雅，更加复用，还可以构建自己的Hook可以将组件逻辑提取到可重用的函数中，这样粒度更小，甚至可以作为一个粒度最小的状态类来进行复用。
```js
const useWindowWith = ()=>{

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => setInnerWidth(window.innerWidth)

  useEffect(()=>{
      window.addEventListener('resize',handleResize)
      return ()=>{
        window.removeEventListener('resize',handleResize)
      }
  })
  return innerWidth
}
...

const App =(props)=> {
    const innerWidth = useWindowWith()
    return (
    <p>当前屏幕宽度：{innerWidth}</p>
    )
}
   
```

## 参考

https://juejin.im/post/5be3ea136fb9a049f9121014

## 最后
请给我一个star 😊