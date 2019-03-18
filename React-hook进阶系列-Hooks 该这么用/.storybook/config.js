import React from "react"
import { configure, addDecorator, addParameters } from '@storybook/react'
import theme from './theme'

// Load all files in the stories folder with a .js extension
const req = require.context('../stories/', true, /.js|jsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    theme: theme,
    isFullscreen: false,
    panelPosition: 'right',
  }
})

addDecorator(story => <div style={{ padding: "0 60px 50px" }}>{story()}</div>)

configure(loadStories, module)