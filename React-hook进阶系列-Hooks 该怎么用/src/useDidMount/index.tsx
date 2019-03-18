import * as React from 'react'

const { useEffect } = React

type noop = () => void

export default function useDidMount(callback: noop, cleanBack?: noop) {
  useEffect(() => {
    callback()
    return () => {
      if (cleanBack) {
        cleanBack()
      }
    }
  }, [])
}


