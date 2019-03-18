import * as React from 'react';

interface UseHover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function useHover() : [boolean, UseHover] {
  const [hovered, setHovered] = React.useState(false)
  const mouse = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }
  return [hovered, mouse]
}

export default useHover;