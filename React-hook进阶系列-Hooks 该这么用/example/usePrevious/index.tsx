import * as React from 'react'
import { Button } from 'antd'
import { usePrevious } from '../../src'

import '../index.scss'

export default function PreviousDemo() {
  const [value, setValue] = React.useState(10)
  const previousValue = usePrevious(value)
  return (
    <div>
      <div>currentValue: {value}, previousValue: {previousValue}</div>
      <div>
        <Button onClick={() => setValue(value + 1)}>点击每次加1</Button>
      </div>
    </div>
  )
}
