# useBottomVisible

用于查看是否网页滑到了底部

## Usage

引入组件

```jsx
import { useBottomVisible } from 'uni-hook'
```

## Demo 代码

```jsx
export default function BottomVisibleDemo() {
  const visible = useBottomVisible()
  return (
    <div>
      visible: {`${visible}`}
    </div>
  )
}
```

## Api

> useBottomVisible() : boolean