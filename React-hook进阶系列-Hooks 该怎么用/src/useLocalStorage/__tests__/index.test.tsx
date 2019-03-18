import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useLocalStorage from '../index'

describe('use localStorage test', () => {
  afterEach(cleanup)
  it('should use sessionStorage', () => {
    const { result } = renderHook(() => useLocalStorage('hook', ''))
    const [value, { setItem, removeItem }] = result.current
    expect(value).toBe('')
    act(() => setItem('hook'))
    expect(result.current[0]).toBe('hook')
    act(() => removeItem())
    expect(result.current[0]).toBe(undefined)
  })
})