import * as React from 'react'
import { useBottomVisible } from '../../src'

import '../index.scss'

export default function BottomVisibleDemo() {
  const visible = useBottomVisible()
  return (
    <div>
      visible: {`${visible}`}
    </div>
  )
}
