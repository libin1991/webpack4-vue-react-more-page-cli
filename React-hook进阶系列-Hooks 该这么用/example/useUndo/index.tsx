import * as React from 'react'
import { Button, Input } from 'antd'
import { useUndo }  from '../../src'

import '../index.scss'

export default function UndoDemo() {
  const [value, { canRedo, canUndo, redo, reset, undo, set }] = useUndo<any>(0)
  const [input, setInput] = React.useState('')

  return (
    <div>
      pastValue: {value.past.join(',')}, presentValue: {value.present}, futureValue: {value.future.join(',')}
      <Input value={input} onChange={e => setInput(e.target.value)}/>
      <div>
        <div>canRedo: {`${canRedo}`}, canUndo: {`${canUndo}`}</div>
        <Button className="mr-20" onClick={() => set(input)}>设置set</Button>
        <Button className="mr-20" onClick={redo}>撤销redo</Button>
        <Button className="mr-20" onClick={undo}>恢复undo</Button>
        <Button className="mr-20" onClick={() => reset(0)}>重置reset</Button>
      </div>
    </div>
  )
}