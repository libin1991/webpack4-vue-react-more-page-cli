# useFocus

主要用于判断是否聚焦

## Usage

引入hook

```jsx
import { useFocus } from 'uni-hook'
```

## Demo 代码

```jsx
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
```

## Api

> useFocus() : [boolean, Method]

### Method

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| onFocus | 聚焦 | function | -- |
| onBlur | 失焦 | function | -- |