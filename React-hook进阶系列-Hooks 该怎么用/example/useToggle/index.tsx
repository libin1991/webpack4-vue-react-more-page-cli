import * as React from 'react'
import { Button } from 'antd'
import { useToggle } from '../../src'

import '../index.scss'

export default function ToggleDemo() {
  const [toggle, setToggle] = useToggle(false)
  return (
    <div>
      <div>toggle: {`${toggle}`}</div>
      <div className="mr-bt">
        <Button onClick={() => setToggle()} className="mr-20">toggle</Button>
        <Button onClick={() => setToggle(true)} className="mr-20">toggle: true</Button>
        <Button onClick={() => setToggle(false)} className="mr-20">toggle: false</Button>
      </div>
    </div>
  )
}
