import * as React from 'react'
import useInterval from '../useInterval';

interface TimerProps {
  // 开始时间
  startTime: number
  // 结束时间
  endTime: number
  // 精确时间 默认为1000毫秒
  timeGap?: number
}

interface Result {
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
}

const { useState } = React

function useTimer({ startTime, endTime, timeGap = 1000 }: TimerProps) : [Result] {
  const duration = endTime - startTime
  const [remainTime, setRemainTime] = useState(duration)

  const formatDuration = () => {
    const time = {
      day: Math.floor(remainTime / 86400000),
      hour: Math.floor(remainTime / 3600000) % 24,
      minute: Math.floor(remainTime / 60000) % 60,
      second: Math.floor(remainTime / 1000) % 60,
      millisecond: Math.floor(remainTime) % 1000
    }
    return time
  }

  useInterval(() => {
    setRemainTime(remainTime - timeGap)
  }, timeGap)

  return [formatDuration()]
}

export default useTimer