import * as React from 'react'

const { useState, useEffect } = React

function useDeviceMotion() {
  const [motion, setMotion] = useState({
    acceleration: {
      x: null,
      y: null,
      z: null,
    },
    accelerationIncludingGravity: {
      x: null,
      y: null,
      z: null,
    },
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null,
    },
    interval: 0,
  });

  useEffect(() => {
    const handle = (deviceMotionEvent: any) => {
      setMotion(deviceMotionEvent);
    };

    window.addEventListener('devicemotion', handle);

    return () => {
      window.removeEventListener('devicemotion', handle);
    };
  }, []);

  return motion;
}

export default useDeviceMotion