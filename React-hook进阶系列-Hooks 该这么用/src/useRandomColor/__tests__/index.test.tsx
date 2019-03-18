import { cleanup, renderHook, act } from 'react-hooks-testing-library'
import useRandomColor from '../index'

describe('useRandomColor Test', () => {
  afterEach(cleanup)
  const colors = ['red', 'blue', 'gray', 'green']
  test('should use random color', () => {
    const { result } = renderHook(() => useRandomColor(colors, 'red'))
    expect(result.current[0]).toBe('red')
  })
  test('should update color', () => {
    const { result } = renderHook(() => useRandomColor(colors, 'red'))
    const changeColor = result.current[1]
    act(() => changeColor())
    expect(colors.includes(result.current[0])).toBe(true)
  })
})