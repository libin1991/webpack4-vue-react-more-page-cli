import * as React from 'react'

const { useState } = React

type Fun = () => void

function useRandomColor(colors: Array<string>, initialColor: string): [string, Fun] {
  const lenColors = colors.length;
  const [color, setColor] = useState(initialColor);

  const changeColor = () => {
    const index = Math.floor(Math.random() * lenColors);
    const pickedColor = colors[index];
    setColor(pickedColor);
  };

  return [color, changeColor];
}

export default useRandomColor