import * as React from 'react'
import { PENDING, REJECTED, RESOLVED } from './constant'

const { useReducer, useEffect } = React

type PromiseType = Promise<any> | (() => Promise<any>)

type Status = 'pending' | 'resolved' | 'rejected'

interface Action {
  type: string
  payload?: any
}

interface State {
  error: any
  result: any
  status: Status
}

const initialState: State = {
  error: undefined,
  result: undefined,
  status: 'pending'
}

function resolvePromise(promise: PromiseType) {
  if (typeof promise === 'function') {
    return promise()
  }
  return promise
}

function reducer(state: any, action: Action) {
  switch (action.type) {
    case PENDING: 
      return {
        error: undefined,
        result: undefined,
        status: PENDING
      }

    case RESOLVED: 
      return {
        error: undefined,
        result: action.payload,
        status: RESOLVED
      }
    
    case REJECTED: 
      return {
        error: action.payload,
        result: undefined,
        status: REJECTED
      }
    
    default:
      return state
  }
}

export default function usePromise(promise: PromiseType, deps: Array<any>) : State {
  const [{ error, result, status }, dispatch] = useReducer(reducer, initialState)
  
  useEffect(() => {
    const clonePromise = resolvePromise(promise)

    if (!clonePromise) {
      return
    }

    let canceled = false

    dispatch({ type: PENDING })

    clonePromise.then(result => {
      !canceled && dispatch({ type: RESOLVED, payload: result })
    }).catch(error => {
      !canceled && dispatch({ type: REJECTED, payload: error })
    })

    return () => {
      canceled = true
    }
  }, deps)

  return { error, result, status }
}
