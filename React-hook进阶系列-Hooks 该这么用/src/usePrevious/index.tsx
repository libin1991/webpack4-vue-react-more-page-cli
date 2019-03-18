import * as React from 'react'

const { useRef, useEffect } = React

function usePrevious<T>(value: T): T {
  // 可以在ref.current挂载任何的值，这个类似于class instance
  const previousValue = useRef(value)

  // 只有value 发生变化的时候重新渲染
  useEffect(() => {
    previousValue.current = value
  }, [value])

  return previousValue.current
}

export default usePrevious