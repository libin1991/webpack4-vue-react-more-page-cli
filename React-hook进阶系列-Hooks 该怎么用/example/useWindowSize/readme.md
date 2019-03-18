# useWindowSize

主要用于屏幕尺寸的改变

## Usage

引入该组件

```jsx
import { useWindowSize } from 'uni-hook'
```

## Demo 代码

```jsx
export default function WindowDemo() {
  const { width, height } = useWindowSize()
  return (
    <div>
      width: { width }, height: {height}
    </div>
  )
}
```

## Api

> useWindowSize() : { width, height}