import * as React from 'react'
import { useTimer } from '../../src'

import '../index.scss'

export default function TimerDemo() {
  const [{ day, hour, minute, second }] = useTimer({ startTime: Date.now(), endTime: new Date('2020/01/30').getTime() })
  const [{ day: universityDay, hour: universityHour, minute: universityMinute, second: universitySecond }] = useTimer({ startTime: Date.now(), endTime: new Date('2019/06/07').getTime() })
  return (
    <div>
      <p>当前时间到2020年1月30日(除夕夜)倒计时</p>
      <p>距离2019年除夕还有 
        <span style={{ color: 'red', fontSize: 26}}>{day}</span>天, 
        <span style={{ color: 'red', fontSize: 26}}>{hour}</span>小时, 
        <span style={{ color: 'red', fontSize: 26}}>{minute}</span>分钟, 
        <span style={{ color: 'red', fontSize: 26}}>{second}</span>秒
      </p>
      <p>距离2019年高考还有 
        <span style={{ color: 'red', fontSize: 26}}>{universityDay}</span>天, 
        <span style={{ color: 'red', fontSize: 26}}>{universityHour}</span>小时, 
        <span style={{ color: 'red', fontSize: 26}}>{universityMinute}</span>分钟, 
        <span style={{ color: 'red', fontSize: 26}}>{universitySecond}</span>秒
      </p>
    </div>
  )
}
