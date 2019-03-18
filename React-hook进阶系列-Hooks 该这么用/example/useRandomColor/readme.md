# useRandomColor

用于随机颜色，也可以随机数组等等

## Usage

引入hook

```jsx
import { useRandomColor } from 'uni-hook'
```

## Demo 代码

```jsx
export default function RandomColorDemo() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  const initialColor = 'red'
  const [selectedColor, changeColor] = useRandomColor(colors, initialColor)
  return (
    <div>
      <div>
        <Button onClick={changeColor}>点击随机改变颜色</Button>
      </div>
      <p>当前选中的彩虹色: <span style={{ color: selectedColor }}>{selectedColor}</span></p>
      {colors.map(c => {
        const style: React.CSSProperties = {}
        style.background = c
        if (c === selectedColor) {
          style.marginRight = '-25px'
        }
        return (
          <div key={c} className="color-item" style={style}>
            {c}
          </div>
        )
      })}
    </div>
  )
}
```

## Api

> useRandomColor(colors: Array, initialColor: any) : [selectedColor, changeColor: function]