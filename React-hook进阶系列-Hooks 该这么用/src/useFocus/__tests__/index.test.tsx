import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useFocus from '../index'

describe('useFocus Test', () => {
  afterEach(cleanup)
  test('should use focus', () => {
    const { result } = renderHook(() => useFocus())
    expect(result.current[0]).toBe(false)
  })
  test('should update focus by focus', () => {
    const { result } = renderHook(() => useFocus())
    const { onFocus } = result.current[1]
    act(() => onFocus())
    expect(result.current[0]).toBe(true)
  })
  test('should update focus by blur', () => {
    const { result } = renderHook(() => useFocus())
    const { onBlur } = result.current[1]
    act(onBlur)
    expect(result.current[0]).toBe(false)
  })
})