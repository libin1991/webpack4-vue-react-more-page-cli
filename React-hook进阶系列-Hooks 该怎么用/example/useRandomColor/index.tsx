import * as React from 'react'
import { Button } from 'antd'
import { useRandomColor } from '../../src'

import '../index.scss'

export default function RandomColorDemo() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  const initialColor = 'red'
  const [selectedColor, changeColor] = useRandomColor(colors, initialColor)
  return (
    <div>
      <div>
        <Button onClick={changeColor}>点击随机改变颜色</Button>
      </div>
      <p>当前选中的彩虹色: <span style={{ color: `${selectedColor}` }}>{selectedColor}</span></p>
      {colors.map(c => {
        const style: React.CSSProperties = {}
        style.background = c
        if (c === selectedColor) {
          style.marginRight = '-25px'
        }
        return (
          <div key={c} className="color-item" style={style}>
            {c}
          </div>
        )
      })}
    </div>
  )
}
