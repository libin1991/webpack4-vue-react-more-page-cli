import * as React from 'react'

const { useState } = React

type Session = (value: any) => void

function useSessionStorage(key: string, initialValue?: any) : [any, Session] {
  const [value, setValue] = useState(() => {
    try {
      const cacheValue = window.sessionStorage.getItem(key)
      return cacheValue ? JSON.parse(cacheValue) : initialValue
    } catch(error) {
      return initialValue
    }
  })

  const setSession = (value: any) => {
    setValue(value)
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  return [value, setSession]
}

export default useSessionStorage