import { renderHook, cleanup } from 'react-hooks-testing-library'
import useDidMount from '../index'

describe('use mount test', () => {
  afterEach(cleanup)
  it('should use mount', () => {
    let a = 0
    const callback = () => { a = 1}
    renderHook(() => useDidMount(callback))
    expect(a).toBe(1)
  })
})