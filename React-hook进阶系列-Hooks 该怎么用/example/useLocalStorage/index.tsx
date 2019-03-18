import * as React from 'react'
import { Button, Input } from 'antd'
import { useLocalStorage } from '../../src'

export default function LocalStorageDemo() {
  const [value, setValue] = React.useState('')
  const [sessionValue, { setItem, removeItem }] = useLocalStorage(value)
  return (
    <div>
      存储的值: {sessionValue}
      <div>
        <Input value={value} onChange={e => setValue(e.target.value)}/>
      </div>
      <div>
        <Button onClick={() => setItem(value)}>点击设置</Button>
        <Button onClick={() => removeItem()}>点击移除</Button>
      </div>
    </div>
  )
}