# useMousePosition

用于监控鼠标位置

## Usage

引入组件

```jsx
import { useMousePosition } from 'uni-hook'
```

## Demo 代码

```jsx
export default function MousePositionDemo() {
  const { x, y } = useMousePosition()
  return (
    <div>
      MouseX: {x}, MouseY: {y}
    </div>
  )
}
```

## Api

> useMousePosition() : Result

### Result

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| x | 横坐标 | number | -- |
| y | 纵坐标 | number | -- |