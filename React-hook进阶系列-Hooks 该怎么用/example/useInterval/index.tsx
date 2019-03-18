import * as React from 'react'
import { Button } from 'antd'
import { useInterval } from '../../src'

import '../index.scss'

export default function IntervalDemo() {
  const [count, setCount] = React.useState(0)
  const [delay, setDelay] = React.useState(1000)
  useInterval(() => {
    setCount(count + 1)
  }, delay)
  return (
    <div>
      Count: {count}
      <div>
        <Button onClick={() => setDelay(1000)} className="mr-20">每1秒加一</Button>
        <Button onClick={() => setDelay(3000)} className="mr-20">每3秒加一</Button>
        <Button onClick={() => setDelay(5000)} className="mr-20">每5秒加一</Button>
        <Button onClick={() => setDelay(7000)} className="mr-20">每7秒加一</Button>
      </div>
    </div>
  )
}