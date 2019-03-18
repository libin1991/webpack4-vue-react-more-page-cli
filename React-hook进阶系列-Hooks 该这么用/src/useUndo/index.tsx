import * as React from 'react'
import { UNDO, REDO, SET, RESET } from './constant'

const { useReducer, useCallback } = React

interface State<T> {
  past: T[]
  present: T
  future: T[]
}

interface Action<T> {
  type: any
  newPresent?: T
}

interface UseUndo<T> {
  undo: () => void
  redo: () => void
  set: (newPresent: T) => void
  reset: (newPresent: T) => void
  canUndo: boolean
  canRedo: boolean
}

const initialState = {
  past: [],
  present: null,
  future: []
}

function reducer<T>(state: any, action: Action<T>) {
  const { past, present, future } = state
  switch (action.type) {
    case UNDO: {
      const previous = past[past.length - 1]
      const pre = past.slice(0, past.length - 1)

      return {
        past: pre,
        present: previous,
        future: [present, ...future]
      }
    }

    case REDO: {
      const next = future[0]
      const nextFuture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: nextFuture
      }
    }

    case SET: {
      const { newPresent } = action
      if (newPresent === present) {
        return state
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }

    case RESET: {
      const { newPresent } = action;

      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
}


export default function useUndo<T>(initialPresent: T) : [State<T>, UseUndo<T>] {
  const [value, dispatch] = useReducer(reducer, { ...initialState, present: initialPresent })

  const canUndo = value.past.length !== 0
  const canRedo = value.future.length !== 0

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: UNDO })
    }
  }, [canUndo, dispatch])

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: REDO })
    }
  }, [canRedo, dispatch])

  const set = useCallback((newPresent: any) => dispatch({ type: SET, newPresent }), [dispatch])

  const reset = useCallback((newPresent: any) => dispatch({ type: RESET, newPresent }), [dispatch])

  return [value, { undo, redo, set, reset, canUndo, canRedo }]
}
