# useSessionStorage

用于存储数据到`session`中

## Usage

引入组件

```jsx
import { useSessionStorage } from 'uni-hook'
```

## Demo 代码

```jsx
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
```

## Api

> useSessionStorage(key, initialValue?: any) : [value: any, setSession: function]