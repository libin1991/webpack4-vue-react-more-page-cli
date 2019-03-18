import * as React from 'react'

interface ScreenProps {
  // ref 当前的ref
  ref: React.RefObject<any>
  rootMargin?: string
}

const { useState, useEffect } = React

/**
 * 这个钩子可以用来封装打点
 */
function useInScreen({ ref, rootMargin = '0px' }: ScreenProps) {

  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    }, { rootMargin })
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.unobserve(ref.current)
      observer.disconnect()
    }
  }, [setIntersecting])

  return isIntersecting
}

export default useInScreen