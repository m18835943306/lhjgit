import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

/**
 * 滚动列表
 * @param columns ColumnsType<T> | any[]
 * @param data data: T[]
 * @param showTitle showTitle?: boolean
 * @param autoScroll false | number `default 5`
 * @param step number `default 2`
 * @param onClick (item, index, data) => void
 * @returns
 */
function ScrollList(props) {
  const {
    data,
    columns,
    showTitle = true,
    autoScroll = 5,
    step = 1,
    selectedKey = false,
    onClick
  } = props
  // console.log(selectedKey)

  const warper = useRef(null)
  const childDom1 = useRef(null)
  const childDom2 = useRef(null) // 开始滚动
  const timer = useRef()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!autoScroll || typeof autoScroll !== 'number') return

    if (warper.current) {
      window.cancelAnimationFrame(timer.current)
      warper.current.style.height = `${height}px`
      if (data.length < autoScroll) {
        return
      }
      roll()
    }
  }, [props.data, height])

  const roll = () => {
    window.cancelAnimationFrame(timer.current)
    if (childDom2.current && childDom1.current && warper.current) {
      if (warper.current.clientHeight > childDom1.current.clientHeight) {
        return
      }
      if (!warper.current || !childDom1.current) return
      timer.current = window.requestAnimationFrame(roll)
      warper.current.scrollTop >= childDom1.current.scrollHeight
        ? (warper.current.scrollTop = 0)
        : (warper.current.scrollTop = warper.current.scrollTop + step)

      // 鼠标移入div时暂停滚动
      warper.current.onmouseover = function () {
        window.cancelAnimationFrame(timer.current)
      }
      // 鼠标移出div后继续滚动
      warper.current.onmouseout = function () {
        timer.current = requestAnimationFrame(roll)
      }
    }
  }

  useEffect(() => {
    const setHeightUtil = () => {
      let h = 0
      if (typeof autoScroll !== 'number') return
      const len =
        Array.isArray(data) && data.length < autoScroll
          ? data.length
          : autoScroll
      if (childDom1.current) {
        for (let index = 0; index < len; index++) {
          const height = childDom1.current.children[index].clientHeight
          h += height
        }
        setHeight(h)
      }
    }
    setHeightUtil()
  }, [childDom1.current, data])

  const handleClick = (ele, index, data) => {
    window.cancelAnimationFrame(timer.current)
    onClick && onClick(ele, index, data)
  }

  return (
    <>
      <div className="list-warpper">
        {showTitle && (
          <div className="list-warpper--title">
            <ul className="list-warpper--content title">
              {columns.map((item) => (
                <li
                  key={item.title}
                  style={{
                    justifyContent: item.align || 'center',
                    alignItems: 'center'
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="list-warpper--body" ref={warper}>
          <div ref={childDom1}>
            {Array.isArray(data) &&
              data.map((ele, index) => {
                return (
                  <ul
                    className={`list-warpper--content body ${
                      selectedKey &&
                      typeof selectedKey === 'number' &&
                      index === selectedKey
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleClick(ele, index, data)}
                  >
                    {columns.map((item) => {
                      const { showTitle = true, dataIndex } = item
                      if (item.render) {
                        return (
                          <li
                            key={item.key}
                            title={
                              showTitle ? ele[showTitle] || ele[dataIndex] : ''
                            }
                            style={{
                              justifyContent: item.align,
                              alignItems: 'center'
                            }}
                          >
                            {item.render(ele[dataIndex], ele)}
                          </li>
                        )
                      } else
                        return (
                          <li
                            key={item.key}
                            title={
                              showTitle ? ele[showTitle] || ele[dataIndex] : ''
                            }
                            style={{
                              justifyContent: item.align || 'center',
                              alignItems: 'center'
                            }}
                          >
                            {ele[dataIndex]}
                          </li>
                        )
                    })}
                  </ul>
                )
              })}
          </div>
          <div ref={childDom2}>
            {Array.isArray(data) &&
              data.map((ele, index) => {
                return (
                  <ul
                    className={`list-warpper--content body ${
                      (selectedKey &&
                        typeof selectedKey === 'number' &&
                        index === selectedKey) ||
                      (selectedKey == 0 && index === selectedKey)
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleClick(ele, index, data)}
                  >
                    {columns.map((item) => {
                      const { showTitle = true, dataIndex } = item
                      if (item.render) {
                        return (
                          <li
                            key={item.key}
                            title={
                              showTitle ? ele[showTitle] || ele[dataIndex] : ''
                            }
                            style={{
                              justifyContent: item.align,
                              alignItems: 'center'
                            }}
                          >
                            {item.render(ele[dataIndex], ele)}
                          </li>
                        )
                      } else
                        return (
                          <li
                            key={item.key}
                            title={
                              showTitle ? ele[showTitle] || ele[dataIndex] : ''
                            }
                            style={{
                              justifyContent: item.align || 'center',
                              alignItems: 'center'
                            }}
                          >
                            {ele[dataIndex]}
                          </li>
                        )
                    })}
                  </ul>
                )
              })}
          </div>
          {/* <div ref={childDom2}></div> */}
        </div>
      </div>
    </>
  )
}

export default ScrollList
