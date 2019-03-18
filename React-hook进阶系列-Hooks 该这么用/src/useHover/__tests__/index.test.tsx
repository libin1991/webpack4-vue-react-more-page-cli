import { renderHook, act, cleanup } from 'react-hooks-testing-library'
import useHover from '../index'

describe('use hover test', () => {
  afterEach(cleanup)
  it('should use hover', () => {
    const { result } = renderHook(() => useHover())
    const [hovered, mouse] = result.current
    expect(hovered).toBe(false)
    act(() => mouse.onMouseEnter())
    expect(result.current[0]).toBe(true)
    act(() => mouse.onMouseLeave())
    expect(result.current[0]).toBe(false)
  })
})