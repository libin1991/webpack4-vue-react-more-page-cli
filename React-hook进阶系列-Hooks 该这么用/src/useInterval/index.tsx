import * as React from 'react'
import { noop } from '../utils'

const { useRef, useEffect } = React

function useInterval(callback = noop, delay: number) {
  const savedCallback: any = useRef({});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {}
  }, [delay]);
}

export default useInterval