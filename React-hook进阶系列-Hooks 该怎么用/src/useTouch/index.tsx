import * as React from 'react'

interface UseTouch {
  onTouchStart: () => void
  onTouchEnd: () => void
}

export default function useTouch() : [boolean, UseTouch] {
  const [touched, setTouched] = React.useState(false);

  const touchEvent = {
    onTouchStart: () => setTouched(true),
    onTouchEnd: () => setTouched(false),
  };

  return [touched, touchEvent];
}