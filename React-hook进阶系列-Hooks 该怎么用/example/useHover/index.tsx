import * as React from 'react'
import { Button } from 'antd'
import { useHover } from '../../src'

import '../index.scss'

export default function HoverDemo() {
  const [hovered, { onMouseEnter, onMouseLeave }] = useHover()
  return (
    <div>
      hovered: {`${hovered}`}
      <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>hover我，快！</Button>
    </div>
  )
}
