# useLockBodyScroll

用于改变`body`的`overflow`属性

## Usage

引入组件

```jsx
import { useLockBodyScroll } from 'uni-hook'
```

## Demo 代码

```jsx
export default function LockBodyScrollDemo() {
  const [lock, setLock] = React.useState(false)
  useLockBodyScroll(lock)
  const toggleLock = () => {
    setLock(!lock)
  }
  return (
    <div>
      <div>Lock:{`${lock}`}</div>
      <div className="mr-bt">
        <Button onClick={toggleLock}>
          toggle lock
        </Button>
      </div>
    </div>
  )
}
```

## Api

> useLockBodyScroll(lock: boolean) 默认为true

*卸载时， 都会把body的`overflow`设置为`visible`*