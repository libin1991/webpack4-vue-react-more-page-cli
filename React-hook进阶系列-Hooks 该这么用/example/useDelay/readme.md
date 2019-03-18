# useDelay

用于延迟执行某些事物

## Usage

引入组件

```jsx
import { useDelay } from 'uni-hook'
```

## Demo 代码

```jsx
export default function DelayDemo() {
  const [delay, setDelay] = React.useState(3000)
  const callback = () => {
    alert('弹窗')
  }
  useDelay(callback, delay)
  return (
    <div>
      <div style={{ color: 'red'}}>首次三秒后弹出</div>
      <Button onClick={() => setDelay(5000)}>改变delay 5秒后再次此弹出</Button>
    </div>
  )
}
```

## Api

> useDelay(callback, delay)