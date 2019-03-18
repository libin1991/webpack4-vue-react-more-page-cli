import * as React from 'react'
import { Button, Input } from 'antd'
import { useSessionStorage } from '../../src'

export default function SessionStorageDemo() {
  const [value, setValue] = React.useState('')
  const [sessionValue, setSession] = useSessionStorage(value)
  return (
    <div>
      存储的值: {sessionValue}
      <div>
        <Input value={value} onChange={e => setValue(e.target.value)}/>
      </div>
      <div>
        <Button onClick={() => setSession(value)}>点击设置</Button>
      </div>
    </div>
  )
}