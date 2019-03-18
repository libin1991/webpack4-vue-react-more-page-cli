import * as React from 'react'

interface MethodsProps {
  onFocus: () => void
  onBlur: () => void
}

const { useState } = React

export default function useFocus(): [boolean, MethodsProps] {
  const [focus, setFocus] = useState(false)

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  return [focus, { onFocus, onBlur }]
}