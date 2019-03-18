# useActive

用于鼠标点击激活

## Usage

引入hook

```jsx
import { useActive } from 'uni-hook'
```

## Demo 代码

```jsx
export default function ActiveDemo() {
  const [active, { onMouseDown, onMouseUp }] = useActive()
  const mousedown = () => {
    console.log('down')
    onMouseDown()
  }
  const mouseup = () => {
    console.log('up')
    onMouseUp()
  }
  return (
    <div>
      <div>
        active: {`${active}`}
      </div>
      <Button onMouseDown={mousedown} onMouseUp={mouseup}>点击测试useActive</Button>
    </div>
  )
}
```

## Api

> useActive() : [boolean, Method]

### Method

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| onMouseDown | 用于激活 | function | -- |
| onMouseUp | 用于关闭激活 | function | -- |