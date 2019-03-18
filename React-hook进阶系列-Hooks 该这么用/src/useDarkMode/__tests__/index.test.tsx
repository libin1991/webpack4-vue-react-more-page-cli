import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useDarkMode from '../index'

describe('useDarkMode Test', () => {
  afterEach(cleanup)
  test('should use dark mode', () => {
    renderHook(() => useDarkMode())
    expect(document.body.className.includes('dark-mode')).toBe(false)
  })
  test('should update mode', () => {
    const { result } = renderHook(() => useDarkMode())
    const { enable } = result.current
    act(() => enable())
    expect(document.body.className.includes('dark-mode')).toBe(true)
    const { disable } = result.current
    act(() => disable())
    expect(document.body.className.includes('dark-mode')).toBe(false)
  })
})