import React, { useMemo } from 'react'

const TestComponent = (props) => {
  const isTest = useMemo(() => {
    return window.location.href.includes('test=true')
  }, [])
  return React.cloneElement(props.children, { isTest })
}

export default TestComponent
