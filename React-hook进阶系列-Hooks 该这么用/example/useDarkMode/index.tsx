import * as React from 'react'
import { Button } from 'antd'
import { useDarkMode } from '../../src'

import '../index.scss'

export default function DarkDemo() {
  const { enable, disable, toggle } = useDarkMode(false)
  return (
    <div>
      <Button className="mr-20" onClick={enable}>暗色主题</Button>
      <Button className="mr-20" onClick={disable}>亮色主题</Button>
      <Button className="mr-20" onClick={toggle}>toggle 切换</Button>
    </div>
  )
}