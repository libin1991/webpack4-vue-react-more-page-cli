import * as React from 'react'

const { useEffect, useState } = React

interface UseWindow {
  width?: number
  height?: number
}

function useWindowSize() : UseWindow {
  const isBrowser = typeof window === 'object'

  const getSize = () => {
    return {
      width: isBrowser ? window.innerWidth : undefined,
      height: isBrowser ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isBrowser) return

    function handleSize() {
      setWindowSize(getSize)
    }

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [setWindowSize])

  return windowSize
}

export default useWindowSize