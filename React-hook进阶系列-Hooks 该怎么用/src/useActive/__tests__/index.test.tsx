import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useActive from '..';

describe('useActive Test', () => {
  afterEach(cleanup)
  test('should use active', () => {
    const { result } = renderHook(() => useActive())
    const current = result.current
    expect(current[0]).toBe(false)
  })
  test('should update active', () => {
    const { result } = renderHook(() => useActive())
    const current = result.current
    const { onMouseDown, onMouseUp } = current[1] as any
    act(() => onMouseDown())
    const active = result.current[0]
    expect(active).toBe(true)
    act(() => onMouseUp())
    const active1 = result.current[0]
    expect(active1).toBe(false)
  })
})