import * as React from 'react'

type Fun = (str: string) => void

interface MethodsProps {
  setCamelCase: Fun
  setSnakeCase: Fun
  setKebabCase: Fun
  setTitleCase: Fun 
}

const { useState } = React

function useToCase(initialValue = ''): [string, MethodsProps] {
  const [value, setValue] = useState(initialValue)

  const validateStr = (str: string) => {
    return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  }

  const setCamelCase = (str: string) => {
    const s = validateStr(str)
    if (s) {
      const target = s.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
      setValue(target.slice(0, 1).toLowerCase() + target.slice(1))
    } else {
      console.error(`${str} not a valid string`)
    }
  }

  const setKebabCase = (str: string) => {
    const s = validateStr(str)
    if (s) {
      const target = s.map(x => x.toLowerCase())
      .join('-');
      setValue(target)
    } else {
      console.error(`${str} not a valid string`)
    }
  }

  const setSnakeCase = (str: string) => {
    const s = validateStr(str)
    if (s) {
      const target = s.map(x => x.toLowerCase())
      .join('_');
      setValue(target)
    } else {
      console.error(`${str} not a valid string`)
    }
  }

  const setTitleCase = (str: string) => {
    const s = validateStr(str)
    if (s) {
      const target = s.map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join(' ')
      setValue(target)
    } else {
      console.error(`${str} not a valid string`)
    }
  }

  return [value, {
    setCamelCase,
    setSnakeCase,
    setKebabCase,
    setTitleCase
  }]
}

export default useToCase