# useDidMount

用于提到class的`didmount`

## Usage 用法

引入hook

```jsx
import { useDidMount } from 'uni-hook'
```

## Demo 代码

```jsx
export default function DidMountDemo() {
  const [visible, setVisible] = React.useState(false)
  const callback = () => {
    setTimeout(() => {
      setVisible(true)
    }, 3000)
  }
  useDidMount(callback)
  return (
    <div>
      等待3秒
      <div>
        { visible ? '加载成功...' : '等待加载' }
      </div>
    </div>
  )
}
```

## Api

> useDidMount(callback, cleanback)