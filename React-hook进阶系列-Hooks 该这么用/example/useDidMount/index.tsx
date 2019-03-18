import * as React from 'react'
import { useDidMount } from '../../src'

import '../index.scss'

export default function DidMountDemo() {
  const [visible, setVisible] = React.useState(false)
  const callback = () => {
    setTimeout(() => {
      setVisible(true)
    }, 3000)
  }
  useDidMount(callback)
  return (
    <div>
      等待3秒
      <div>
        { visible ? '加载成功...' : '等待加载' }
      </div>
    </div>
  )
}