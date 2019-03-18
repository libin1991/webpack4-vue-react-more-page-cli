import * as React from 'react'
import { useMousePosition } from '../../src'

import '../index.scss'

export default function MousePositionDemo() {
  const { x, y } = useMousePosition()
  return (
    <div>
      MouseX: {x}, MouseY: {y}
    </div>
  )
}
