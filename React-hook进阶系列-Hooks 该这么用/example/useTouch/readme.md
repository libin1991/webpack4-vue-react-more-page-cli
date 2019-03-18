# useTouch

用于手势的操作,触摸点击

## Usage 用法

引入hook

```jsx
import { useTouch } from 'uni-hook'
```

## Demo 代码

```jsx
export default function TouchDemo() {
  const [touched, { onTouchStart, onTouchEnd }] = useTouch()
  return (
    <div>
      touched: {`${touched}`}
      <Button onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>touch我, 快！！！</Button>
    </div>
  )
}
```

## Api

> useTouch(): [touched: boolean, Method]

### Method

> onTouchStart: function  
> onTouchEnd: function