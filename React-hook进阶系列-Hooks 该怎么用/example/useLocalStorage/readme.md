# useLocalStorage

用于存储数据到`session`中

## Usage

引入组件

```jsx
import { useLocalStorage } from 'uni-hook'
```

## Demo 代码

```jsx
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
```

## Api

> useLocalStorage(key, initialValue?: any) : [value: any, setSession: function]