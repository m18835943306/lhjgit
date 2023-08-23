export function getNodeSize(dom) {
  if (!dom) {
    return {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }
  }
  return dom.getBoundingClientRect()
}
