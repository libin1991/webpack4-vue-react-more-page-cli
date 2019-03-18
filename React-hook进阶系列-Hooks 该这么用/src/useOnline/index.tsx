import * as React from 'react'

const { useState, useEffect} = React

export default function useOnline() {
  const [online, changeOnline] = useState(false)

  function setOnline() {
    changeOnline(true)
  }

  function setOffline() {
    changeOnline(false)
  }

  useEffect(() => {
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)
    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [changeOnline])

  return online
}