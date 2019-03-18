import { act, renderHook, cleanup } from 'react-hooks-testing-library'
import useToggle from '../index'

describe('useToggle Test', () => {
  afterEach(cleanup)
  test('should use toggle', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current[0]).toBeFalsy()
  })
  test('should update toggle', () => {
    const { result } = renderHook(() => useToggle(false))
    const toggle = result.current[1]
    act(toggle)
    expect(result.current[0]).toBeTruthy()
  })
  test('should update toggle own', () => {
    const { result } = renderHook(() => useToggle(false))
    const toggle = result.current[1]
    act(() => toggle(false))
    expect(result.current[0]).toBeFalsy()
  })
})