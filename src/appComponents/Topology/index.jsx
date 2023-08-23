import React, { useState, useEffect, useRef, useCallback } from 'react'
import './index.scss'
import { getNodeSize } from './utils'

const Topology = () => {
  const [wrapper, setWrapper] = useState(null)
  const [$canvas, set$Canvas] = useState(null)
  const [canvasPos, setCanvasPos] = useState(null)
  const drawCanvas = (clientX, clientY) => {
    if (!wrapper) {
      return
    }
    const canvasSize = getNodeSize($canvas)
    const wrapperSize = getNodeSize(wrapper)
    const dX = canvasPos.x - clientX
    const dY = canvasPos.y - clientY
    const translateX = canvasSize.left - wrapperSize.left
    const translateY = canvasSize.top - wrapperSize.top
    setCanvasPos({ x: clientX, y: clientY })
    $canvas.style.transform = `translate(${translateX + -dX}px, ${
      translateY + -dY
    }px)`
  }
  const setCanvasCenter = () => {
    const wrapperSize = getNodeSize(wrapper)
    const canvasSize = getNodeSize($canvas)
    const canvasCenter = {
      x: canvasSize.width / 2,
      y: canvasSize.height / 2
    }
    const defaultScrollTop = (canvasSize.height - wrapperSize.height) / 2
    const defaultScrollLeft = (canvasSize.width - wrapperSize.width) / 2

    $canvas.style.transform = `translate(50%, 50%)`
  }
  const onMouseMove = (e) => {
    if (!canvasPos) return
    wrapper.style.cursor = 'pointer'
    const isDraggingCanvas = canvasPos
    if (isDraggingCanvas) {
      drawCanvas(e.clientX, e.clientY)
    }
  }
  const onMouseDown = (e) => {
    wrapper.style.cursor = 'pointer'
    setCanvasPos({
      x: e.clientX,
      y: e.clientY
    })
  }
  const onMouseUp = () => {
    clearMouseEventData()
  }
  const clearMouseEventData = () => {
    wrapper.style.cursor = 'default'
    setCanvasPos(null)
  }

  const scaleCanvas = () => {}
  useEffect(() => {
    if (!wrapper || !$canvas) return
    setCanvasCenter()
    wrapper.oncontextmenu = function () {
      return false
    }
    wrapper.onselectstart = function () {
      return false
    }
  }, [wrapper, $canvas])
  return (
    <div className="topology">
      <div
        className="topology_wrapper"
        ref={(r) => setWrapper(r)}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={clearMouseEventData}
      >
        <div className="topology_canvas" ref={(r) => set$Canvas(r)}>
          <div className="canvas">canvas</div>
        </div>
      </div>
    </div>
  )
}

export default Topology
