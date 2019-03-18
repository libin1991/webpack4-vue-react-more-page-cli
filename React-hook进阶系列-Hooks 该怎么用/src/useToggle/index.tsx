import * as React from 'react'

const { useState, useCallback } = React

type UseToggle = [
  boolean, // state
  (nextValue?: boolean) => void // toggle，可以主动设置toggle
];

function useToggle(state: boolean): UseToggle {
  const [value, setValue] = useState<boolean>(state);

  const toggle = useCallback((nextValue?: boolean) => {
    if (typeof nextValue !== 'undefined') {
      setValue(!!nextValue);
      return;
    }

    setValue(value => !value)
  }, [setValue]);

  return [value, toggle];
};

export default useToggle;