import * as React from 'react'

const { useState, useEffect } = React

interface Result {
  value: boolean,
  enable: () => void
  disable: () => void
  toggle: () => void
}

// Hook
const className = 'dark-mode';
const element = document.body;

function useDarkMode(initialValue = false): Result {
  // Enabled state for dark mode
  const [value, setDarkMode] = useState(initialValue);

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      if (value) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [value] // Only re-call effect when value changes
  );

  // Return object containing value and handy methods for changing value
  return {
    value,
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
    toggle: () => setDarkMode(current => !current)
  };

};

export default useDarkMode
