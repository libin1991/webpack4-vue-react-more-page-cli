import * as React from 'react'

const { useEffect, useState } = React

const initialPosition = {
  x: null,
  y: null
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState(initialPosition)

  const handle = (e: any) => {
    const x = e.screenX
    const y = e.screenY
    setMousePosition({x, y})
  }

  useEffect(() => {
    window.addEventListener('mousemove', handle)
    return () => {
      window.removeEventListener('mousemove', handle)
    }
  }, [setMousePosition])

  return mousePosition
}

export default useMousePosition