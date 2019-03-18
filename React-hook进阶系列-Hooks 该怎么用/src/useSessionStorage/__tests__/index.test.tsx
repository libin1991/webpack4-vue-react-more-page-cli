import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useSessionStorage from '../index'

describe('use sessionStorage test', () => {
  afterEach(cleanup)
  it('should use sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('hook', ''))
    const [value, setValue] = result.current
    expect(value).toBe('')
    act(() => setValue('hook'))
    expect(result.current[0]).toBe('hook')
  })
})