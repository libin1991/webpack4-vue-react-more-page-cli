import * as React from 'react'
import { Button } from 'antd'
import { useLockBodyScroll } from '../../src'

import '../index.scss'

export default function LockBodyScrollDemo() {
  const [lock, setLock] = React.useState(false)
  useLockBodyScroll(lock)
  const toggleLock = () => {
    setLock(!lock)
  }
  return (
    <div>
      <div>Lock:{`${lock}`}</div>
      <div className="mr-bt">
        <Button onClick={toggleLock}>
          toggle lock
        </Button>
      </div>
    </div>
  )
}
