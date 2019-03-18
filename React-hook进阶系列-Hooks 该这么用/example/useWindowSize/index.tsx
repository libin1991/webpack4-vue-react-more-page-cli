import * as React from 'react'
import { useWindowSize } from '../../src'

import '../index.scss'

export default function WindowDemo() {
  const { width, height } = useWindowSize()
  return (
    <div>
      width: { width }, height: {height}
    </div>
  )
}
