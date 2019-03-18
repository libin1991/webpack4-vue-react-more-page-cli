import * as React from 'react'
import { useActive } from '../../src'
import { Button } from 'antd'

import '../index.scss'

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