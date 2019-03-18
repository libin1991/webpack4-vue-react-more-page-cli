import * as React from 'react'

interface MethodsProps {
  increment: () => void
  decrement: () => void
  incrementBy: (step: number) => void
  decrementBy: (step: number) => void
}

const { useState } = React

function useCounter(initialValue: number) : [number, MethodsProps] {
  const [count, setCount] = useState(initialValue)

  const incrementBy = (step: number) => {
    setCount(count + step)
  }

  const decrementBy = (step: number) => {
    setCount(count - step)
  }

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return [count, {
    increment,
    decrement,
    decrementBy,
    incrementBy
  }]
}

export default useCounter