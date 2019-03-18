import * as React from 'react'

interface MethodsProps {
  onMouseDown: () => void
  onMouseUp: () => void
}

const { useState } = React

export default function useActive() : [boolean, MethodsProps] {
  const [active, setActive] = useState(false)

  const onMouseDown = () => {
    setActive(true)
  }

  const onMouseUp = () => {
    setActive(false)
  }

  return [active, { onMouseDown, onMouseUp }]
}