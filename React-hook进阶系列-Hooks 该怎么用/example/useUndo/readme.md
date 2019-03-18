# useUndo

用于撤销恢复等操作

## Usage 用法

引入hook

```jsx
import { useUndo } from 'uni-hook'
```

## Demo 代码

```jsx
export default function UndoDemo() {
  const [value, { canRedo, canUndo, redo, reset, undo, set }] = useUndo<any>(0)
  const [input, setInput] = React.useState('')
  return (
    <div>
      pastValue: {value.past.join(',')}, presentValue: {value.present}, futureValue: {value.future.join(',')}
      <Input value={input} onChange={e => setInput(e.target.value)}/>
      <div>
        <div>canRedo: {`${canRedo}`}, canUndo: {`${canUndo}`}</div>
        <Button className="mr-20" onClick={() => set(input)}>设置set</Button>
        <Button className="mr-20" onClick={redo}>撤销redo</Button>
        <Button className="mr-20" onClick={undo}>恢复undo</Button>
        <Button className="mr-20" onClick={() => reset(0)}>重置reset</Button>
      </div>
    </div>
  )
}
```

## Api

> useUndo() : [value: ObjectValue, Method]

## ObjectValue

> past 过去值  
> present 当前值  
> future 未来值  

## Method

> canRedo: boolean  
> canUndo: boolean  
> redo: function  
> undo: function  
> set: function(value)  
> reset: function(value)