# useCounter

主要用于加减计算

## Usage

引入hook

```jsx
import { useCounter } from 'uni-hook'
```

## demo 代码

```jsx
export default function CounterDemo() {
  const [count, { increment, incrementBy, decrement, decrementBy }] = useCounter(0)
  return (
    <div>
      <div className="mr-bt">Count: {count}</div>
      <Button onClick={() => increment()} className="Button">逐一递增</Button>
      <Button onClick={() => incrementBy(5)} className="mr-20 Button">逐五递增</Button>
      <Button onClick={() => decrement()} className="mr-20 Button">逐一递减</Button>
      <Button onClick={() => decrementBy(5)} className="mr-20 Button">逐五递减</Button>
    </div>
  )
}
```

## Api

> useCounter(initialValue: number) : [number, Method]

### Method

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| increment | 增加函数, 每次加`1` | function |
| incrementBy | 增加函数, 每次加`step` | (step: number) => void |
| decrement | 减少函数, 每次减`1` | function |
| decrementBy | 减少函数, 每次减`step` | (step: number) => void |