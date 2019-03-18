# usePrevious

获取前一个值

## Usage

引入组件

```jsx
import { usePrevious } from 'uni-hook'
```

## Demo 代码

```jsx
export default function PreviousDemo() {
  const [value, setValue] = React.useState(10)
  const previousValue = usePrevious(value)
  return (
    <div>
      <div>currentValue: {value}, previousValue: {previousValue}</div>
      <div>
        <Button onClick={() => setValue(value + 1)}>点击每次加1</Button>
      </div>
    </div>
  )
}
```

## Api

> usePrevious(value: number) : number