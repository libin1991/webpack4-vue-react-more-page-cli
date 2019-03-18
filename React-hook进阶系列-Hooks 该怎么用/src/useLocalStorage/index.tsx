import * as React from 'react'

const { useState } = React

interface Storage {
  setItem: (value: string) => void
  removeItem: () => void
}

function useLocalStorage(key: string, initialValue?: any): [any, Storage] {
  const [value, setValue] = useState(() => {
    try {
      const cacheValue = window.localStorage.getItem(key)
      return cacheValue ? JSON.parse(cacheValue) : initialValue
    } catch(error) {
      return initialValue
    }
  })

  const setItem = (value: any) => {
    setValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const removeItem = () => {
    setValue(undefined)
    window.localStorage.removeItem(key)
  }

  return [value, { setItem, removeItem }]
}

export default useLocalStorage