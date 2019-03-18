import * as React from 'react'
import { noop } from '../utils'

const { useEffect } = React

function useDelay(callback = noop, delay: number) {
  useEffect(() => {
    const timeOut = setTimeout(callback, delay)
    return () => {
      clearTimeout(timeOut)
    }
  }, [delay])
}

export default useDelay