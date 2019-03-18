# useKeyPress

用于按键点击

## Usage

引入hook

```jsx
import { useKeyPress } from 'uni-hook'
```

## Demo 代码

```jsx
const data = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
export default function KeyPressDemo() {
  const [alpha, setAlpha] = React.useState('a')
  const keyPressed = useKeyPress(alpha)
  const  handleClick = (d: string) => {
    setAlpha(d.toLowerCase())
  }
  return (
    <div>
      <div className="alpha">
        {
          data.map(d => {
            const active = alpha.toUpperCase() === d
            return (
              <div className={`alpha-item ${active ? 'active' : ''}`} key={d} onClick={() => handleClick(d)}>{d}</div>
            )
          })
        }
      </div>
      {keyPressed ? (
        <div className="mr-bt"><span style={{ color: 'red' }}>{alpha.toUpperCase()}</span>被点击过</div>
      ) : (
        <div className="mr-bt">
          目标{alpha.toUpperCase()}没被点击
        </div>
      )}
    </div>
  )
}
```

## Api

> useKeyPress(targetKey: string) : boolean