import * as React from 'react'

const { useState, useEffect } = React

function useKeyPress(targetKey: string) : boolean {
  const [keyPressed, setKeyPressed] = useState(false)
  function keyDown({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }
  function keyUp({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [targetKey])
  return keyPressed
}

export default useKeyPress