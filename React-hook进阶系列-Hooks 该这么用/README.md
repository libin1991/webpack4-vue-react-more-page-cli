# uni-hook

custom hook for react

## Install

```jsx
yarn add uni-hook   or  npm install uni-hook
```

## Usage

```jsx
import { useCounter } from 'uni-hook'

function Counter() {
  const [count, { increment, incrementBy, decrement, decrementBy }] = useCounter(0)
  return (
    <div>
      <div className="mr-bt">Count: {count}</div>
      <Button onClick={() => increment()} className="Button">逐一递增</Button>
      <Button onClick={() => incrementBy(5)} className="mr-20 Button">逐五递增</Button>
      <Button onClick={() => decrement()} className="mr-20 Button">逐一递减</Button>
      <Button onClick={() => decrementBy(5)} className="mr-20 Button">逐五递减</Button>
    </div>
  )
}
```

## All Hook

+ [useCounter](https://snakeuni.github.io/customHook/?path=/story/hook--usecounter)
+ [useActive](https://snakeuni.github.io/customHook/?path=/story/hook--useactive)
+ [useBottomVisible](https://snakeuni.github.io/customHook/?path=/story/hook--usebottomvisible)
+ [useDarkMode](https://snakeuni.github.io/customHook/?path=/story/hook--usedarkmode)
+ [useDelay](https://snakeuni.github.io/customHook/?path=/story/hook--usedelay)
+ [useFocus](https://snakeuni.github.io/customHook/?path=/story/hook--usefocus)
+ [useInScreen](https://snakeuni.github.io/customHook/?path=/story/hook--useinscreen)
+ [useInterval](https://snakeuni.github.io/customHook/?path=/story/hook--useinterval)
+ [useKeyPress](https://snakeuni.github.io/customHook/?path=/story/hook--usekeypress)
+ [useLockBodyScroll](https://snakeuni.github.io/customHook/?path=/story/hook--uselockbodyscroll)
+ [useMousePosition](https://snakeuni.github.io/customHook/?path=/story/hook--usemouseposition)
+ [usePrevious](https://snakeuni.github.io/customHook/?path=/story/hook--useprevious)
+ [useRandomColor](https://snakeuni.github.io/customHook/?path=/story/hook--userandomcolor)
+ [useTimer](https://snakeuni.github.io/customHook/?path=/story/hook--usetimer)
+ [useToCase](https://snakeuni.github.io/customHook/?path=/story/hook--usetocase)
+ [useToggle](https://snakeuni.github.io/customHook/?path=/story/hook--usetoggle)
+ [useWindowSize](https://snakeuni.github.io/customHook/?path=/story/hook--usewindowsize)
+ [useSessionStorage](https://snakeuni.github.io/customHook/?path=/story/hook--usesessionstorage)
+ [useLocalStorage](https://snakeuni.github.io/customHook/?path=/story/hook--uselocalstorage)
+ [usePromise](https://snakeuni.github.io/customHook/?path=/story/hook--usepromise)
+ [useDidMount](https://snakeuni.github.io/customHook/?path=/story/hook--usedidmount)
+ [useHover](https://snakeuni.github.io/customHook/?path=/story/hook--usehover)
+ [useTouch](https://snakeuni.github.io/customHook/?path=/story/hook--usetouch)
+ [useUndo](https://snakeuni.github.io/customHook/?path=/story/hook--useundo)
+ [useDimensions](https://snakeuni.github.io/customHook/?path=/story/hook--usedimensions)