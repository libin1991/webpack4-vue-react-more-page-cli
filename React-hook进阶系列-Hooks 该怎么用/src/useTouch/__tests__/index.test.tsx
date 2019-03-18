import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useTouch from '../index'

describe('use touch test', () => {
  afterEach(cleanup)
  it('should use touch', () => {
    const { result } = renderHook(() => useTouch())
    expect(result.current[0]).toBe(false)
    act(() => result.current[1].onTouchStart())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1].onTouchEnd())
    expect(result.current[0]).toBe(false)
  })
})
