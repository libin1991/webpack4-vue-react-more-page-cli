import * as React from 'react'

const { useState, useEffect } = React

function useBottomVisible() {

  const [visible, setVisible] = useState(false)

  const handle = () => {
    if (document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [setVisible])

  return visible
}

export default useBottomVisible