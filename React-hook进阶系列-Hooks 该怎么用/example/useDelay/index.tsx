import * as React from 'react'
import { Button } from 'antd'
import { useDelay } from '../../src'

import '../index.scss'


export default function DelayDemo() {
  const [delay, setDelay] = React.useState(3000)
  const callback = () => {
    alert('弹窗')
  }
  useDelay(callback, delay)
  return (
    <div>
      <div style={{ color: 'red'}}>首次三秒后弹出</div>
      <Button onClick={() => setDelay(5000)}>改变delay 5秒后再次此弹出</Button>
    </div>
  )
}