import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useCounter from '../index'

describe('useCounter Test', () => {
  afterEach(cleanup)
  it('should use counter', () => {
    const { result } = renderHook(() => useCounter(1))
    const count = result.current[0]
    expect(count).toBe(1)
  })
  it('increment count', () => {
    const { result } = renderHook(() => useCounter(1))
    const { increment } = result.current[1]
    act(() => increment())
    expect(result.current[0]).toBe(2)
    const { incrementBy } = result.current[1]
    act(() => incrementBy(2))
    expect(result.current[0]).toBe(4)
  })
  it('decrement count', () => {
    const { result } = renderHook(() => useCounter(5))
    const { decrement } = result.current[1]
    act(() => decrement())
    expect(result.current[0]).toBe(4)
    const { decrementBy } = result.current[1]
    act(() => decrementBy(2))
    expect(result.current[0]).toBe(2)
  })
})