import * as React from 'react'
import { Button } from 'antd'
import { useCounter } from '../../src/index'

import '../index.scss'

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