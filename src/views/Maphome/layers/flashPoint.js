import Overlay from 'ol/Overlay'
import { transform } from 'ol/proj'

// import { wgs84togcj02 } from "../utils/coordinate";
import { wgs84togcj02 } from '@ysrd/ol5-react-ts/utils'

/** @type {*}
 * 点位发散效果 （dom 元素）
 */
let flashPointOverlay
const flashPoint = {
  setFlashPoint(map, info, popupOverlay) {
    this.removeFlashPoint(map, popupOverlay)
    let coord = info && info.values_.data
    let coordinate = wgs84togcj02(
      Number(coord && coord.wgs84_lng),
      Number(coord && coord.wgs84_lat)
    )
    var element = document.createElement('div')
    element.className = 'point_animation'
    var p = document.createElement('p')
    var span = document.createElement('span')
    element.appendChild(p)
    element.appendChild(span)
    flashPointOverlay = new Overlay({
      element: element,
      positioning: 'center-center'
    })
    flashPointOverlay.setPosition(
      transform([coordinate[0], coordinate[1]], 'EPSG:4326', 'EPSG:3857')
    )
    map.addOverlay(flashPointOverlay)
  },
  removeFlashPoint(map, popupOverlay) {
    if (popupOverlay) {
      var flashPoint = document.getElementsByClassName('point_animation')[0]
      if (flashPoint) {
        flashPoint.remove()
        map.removeOverlay(popupOverlay)
      }
    }
  }
}

export default flashPoint
