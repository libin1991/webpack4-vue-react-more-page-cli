import { renderHook, cleanup } from 'react-hooks-testing-library'
import usePrevious from '../index'

describe('usePrevious Test', () => {
  afterEach(cleanup)
  test('should use previous', () => {
    const { result } = renderHook(() => usePrevious(1))
    expect(result.current).toBe(1)
  })
})