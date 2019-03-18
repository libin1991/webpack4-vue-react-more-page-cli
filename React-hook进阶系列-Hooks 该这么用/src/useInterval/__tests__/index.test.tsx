import { renderHook, cleanup } from 'react-hooks-testing-library'
import useInterval from '../index'

jest.useFakeTimers()

describe('useInterval Test', () => {
  afterEach(cleanup)

  test('should use interval', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(callback, 1000)) 
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runOnlyPendingTimers();
    expect(callback).toBeCalled();
  })
})
jest.clearAllTimers()