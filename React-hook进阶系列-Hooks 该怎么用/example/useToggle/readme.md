# useToggle

用于切换状态

## Usage

引入hook

```jsx
import { useToggle } from 'uni-hook'
```

## Demo 代码

```jsx
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
```

## Api

> useToggle(state: boolean) : [toggle, setToggle]  
> setToggle(nextValue?: boolean)