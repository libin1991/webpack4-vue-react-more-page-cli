import * as React from 'react'
import { Button } from 'antd'
import { useTouch } from '../../src'

import '../index.scss'

export default function TouchDemo() {
  const [touched, { onTouchStart, onTouchEnd }] = useTouch()
  return (
    <div>
      touched: {`${touched}`}
      <Button onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>touch我, 快！！！</Button>
    </div>
  )
}