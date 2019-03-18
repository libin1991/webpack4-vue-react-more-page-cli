# useToCase

用于转换字符串

## Usage

引入hook

```jsx
import { useToCase } from 'uni-hook'
```

## Demo 代码

```jsx
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
```

## Api

> useToCase(initialValue: string): [value, Method]

### Method

| 属性   |      说明     |  类型 | 默认值 |
|----------|:-------------:|:------:| ------: |
| setCamelCase | 驼峰 | function(value) | -- |
| setKebabCase | 中划线 | function(value) | -- |
| setSnakeCase | 下划线 | function(value) | -- |
| setTitleCase | title类型 首字母大写 中间空格 | function(value) | -- |