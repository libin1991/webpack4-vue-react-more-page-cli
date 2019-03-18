import { renderHook, act, cleanup } from 'react-hooks-testing-library'
import useUndo from '../index'

describe('use undo test', () => {
  afterEach(cleanup)

  it('should use undo', () => {
    const { result } = renderHook(() => useUndo(3))
    expect(result.current[0]).toEqual({ past: [], present: 3, future: []})
    act(() => result.current[1].set(4))
    expect(result.current[0]).toEqual({ past: [3], present: 4, future: []})
    expect(result.current[1].canUndo).toBe(true)
    act(() => result.current[1].undo())
    expect(result.current[0]).toEqual({ past: [], present: 3, future: [4]})
    expect(result.current[1].canRedo).toBe(true)
    act(() => result.current[1].redo())
    expect(result.current[0]).toEqual({ past: [3], present: 4, future: []})
    act(() => result.current[1].reset(3))
    expect(result.current[0]).toEqual({ past: [], present: 3, future: []})
    expect(result.current[1].canUndo).toBe(false)
    expect(result.current[1].canRedo).toBe(false)
  })
})