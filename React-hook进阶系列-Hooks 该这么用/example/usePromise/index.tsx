import * as React from 'react'
import { usePromise } from '../../src'

import '../index.scss'

const resolvePromise = Promise.resolve(1)
const pendingPromise = new Promise(() => {})
const rejectedPromise = Promise.reject('cancel')

export default function PromiseDemo() {
  const { error, result, status } = usePromise(resolvePromise, [])
  const { error: pendError, result: pendResult, status: pendStatus } = usePromise(pendingPromise, [])
  const { error: rejectError, result: rejectResult, status: rejectStatus } = usePromise(rejectedPromise, [])
  return (
    <div>
      <div>成功状态值 error: {`${error}`}, result: {`${result}`}, status: {`${status}`}</div>
      <div>进行中状态值 error: {`${pendError}`}, result: {`${pendResult}`}, status: {`${pendStatus}`}</div>
      <div>拒绝状态值 error: {`${rejectError}`}, result: {`${rejectResult}`}, status: {`${rejectStatus}`}</div>
    </div>
  )
}