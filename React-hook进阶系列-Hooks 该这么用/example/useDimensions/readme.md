# useDimensions

用于获取指定元素的大小，距离等

## Usage 用法

引入hook

```jsx
import { useDimensions } from 'uni-hook'
```

## Demo 代码

```jsx
export default function DimensionTest() {
  const [toggle, setToggle] = React.useState(false)
  const [childRef, rect] = useDimensions()
  return (
    <React.Fragment>
      {toggle ? <div ref={childRef} id="test">hello world</div> : null}
      <button onClick={() => setToggle(!toggle)}>toggle hello</button>
      <div>hello, world 的宽度是{(rect as ClientRect).width}px</div>
    </React.Fragment>
  )
}
```

## Api

> useDimensions() : [ref: function, dimensions: ClientRect | DOMRect ]