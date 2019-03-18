import * as React from 'react'
import { Input, Button } from 'antd'
import { useToCase } from '../../src'

import '../index.scss'

export default function ToCase() {
  const [value, setValue] = React.useState('')
  const [caseValue, { setCamelCase, setKebabCase, setSnakeCase, setTitleCase }] = useToCase(value)
  return (
    <div>
      <div>Input的值: {value}</div>
      <div className="mr-bt">转换后的值: <span style={{ color: 'red', fontSize: 26 }}>{caseValue}</span></div>
      <div className="mr-bt">
        <Input value={value} onChange={e => setValue(e.target.value)}/>
      </div>
      <div className="mr-bt">
        <Button onClick={() => setCamelCase(value)} className="mr-20">setCamelCase</Button>
        <Button onClick={() => setKebabCase(value)} className="mr-20">setKebabCase</Button>
        <Button onClick={() => setSnakeCase(value)} className="mr-20">setSnakeCase</Button>
        <Button onClick={() => setTitleCase(value)} className="mr-20">setTitleCase</Button>
      </div>
    </div>
  )
}
