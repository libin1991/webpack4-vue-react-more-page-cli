import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import usePromise from '../index'

describe('use promise test', () => {
  afterEach(cleanup)

  it('should use promise `pending`', () => {
    const promise = new Promise(() => {})
    const { result } = renderHook(() => usePromise(promise, []))
    expect(result.current).toEqual({ error: undefined, result: undefined, status: 'pending'})
  })

  it('should use promise `resolved`', () => {
    const promise = Promise.resolve(1)
    const { result } = renderHook(() => usePromise(promise, []))
    expect(result.current).toEqual({ error: undefined, result: 1, status: 'resolved'})
    act(() => promise.then())
  })
})