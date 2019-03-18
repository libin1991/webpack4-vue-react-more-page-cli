import { renderHook, cleanup } from 'react-hooks-testing-library'
import useTimer from '../index'

jest.useFakeTimers()

describe('useTimer Test', () => {
  afterEach(cleanup)

  test('should use timer', () => {
    renderHook(() => useTimer({ startTime: 1551928284962, endTime: 1552014684962 })) 
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runOnlyPendingTimers();
  })
})
jest.clearAllTimers()