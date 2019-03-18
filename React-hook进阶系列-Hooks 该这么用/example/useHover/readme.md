# useHover

用于hover状态,常常是css的hover 无法解决的状态

## Usage 用法

引入hook

```jsx
import { useHover } from 'uni-hook'
```

## Demo 代码

```jsx
export default function HoverDemo() {
  const [hovered, { onMouseEnter, onMouseLeave }] = useHover()
  return (
    <div>
      hovered: {`${hovered}`}
      <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>hover我，快！</Button>
    </div>
  )
}
```

## Api

> useHover(): [hovered: boolean, Method]

### Method
> onMouseEnter  
> onMouseLeave