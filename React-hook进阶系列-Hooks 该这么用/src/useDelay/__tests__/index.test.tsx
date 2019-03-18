import { renderHook, cleanup } from 'react-hooks-testing-library'
import useDelay from '../index'

jest.useFakeTimers()

describe('useDelay Test', () => {
  afterEach(cleanup)
  test('should use delay', () => {
    const fn = jest.fn()
    renderHook(() => useDelay(fn, 3000))
    jest.runAllTimers()
    expect(fn).toBeCalled()
  })
  jest.clearAllTimers()
})