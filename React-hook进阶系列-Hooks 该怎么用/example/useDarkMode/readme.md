# useDarkMode

用于随时改变主题

## Usage

引入组件

```jsx
import { useDarkMode } from 'uni-hook'
```

## Demo 代码

```jsx
export default function DarkDemo() {
  const { enable, disable, toggle } = useDarkMode(false)
  return (
    <div>
      <Button className="mr-20" onClick={enable}>暗色主题</Button>
      <Button className="mr-20" onClick={disable}>亮色主题</Button>
      <Button className="mr-20" onClick={toggle}>toggle 切换</Button>
    </div>
  )
}
```

## Api

> useDarkMode(initialValue) : Result  `initialValue`初始为`false`

### Result

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| value | 返回的值 | boolean | false |
| enable | 改变为暗色主题 | function |
| disable | 修改回默认主题 | function |
| toggle | 切换主题 | function |