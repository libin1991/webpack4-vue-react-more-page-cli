import * as React from 'react'
import { noop } from '../utils'

const { useEffect } = React

/**
 * 只适用于曝光打点，hook不能用于事件中
 * @param callback 
 */
function useLogger(callback = noop) {
  useEffect(() => {
    callback()
  }, [])
}

export default useLogger