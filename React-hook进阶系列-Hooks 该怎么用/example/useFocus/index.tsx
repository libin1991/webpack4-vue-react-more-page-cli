import * as React from 'react'
import { Input } from 'antd'
import { useFocus } from '../../src'

import '../index.scss'

export default function FocusDemo() {
  const [focus, { onFocus, onBlur }] = useFocus()
  return (
    <div>
      <div>focus:<span style={{ color: 'red' }}>{`${focus}`}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{ marginRight: 10}}>试试:</div>
        <div className="mr-bt"><Input onFocus={onFocus} onBlur={onBlur}/></div>
      </div>
    </div>
  )
}
