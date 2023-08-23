/**
 * flashFeatureLayer
 * 地图闪烁效果图层
 */
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import Circle from 'ol/style/Circle'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import { easeOut } from 'ol/easing'
import { transform } from 'ol/proj'
import { unByKey } from 'ol/Observable'
import { wgs84togcj02 } from '@ysrd/ol5-react-ts/utils'

let flashFeatureLayer = function (map, zIndex) {
  if (!(this instanceof flashFeatureLayer)) {
    return new flashFeatureLayer(map)
  }
  this.map = map
  this.zIndex = zIndex
  this.init(map)
}

flashFeatureLayer.prototype = {
  constructor: flashFeatureLayer,
  init: function () {
    //地图闪烁效果图层
    let flashLayer = (this.flashLayer = new VectorLayer({
      source: new VectorSource({}),
      name: 'flashVector',
      /**
       * 2021年11月15日16:02:35
       * 降低了闪烁图层等级 99 => 3
       * 点位 为 5
       * geoServer 图层为1
       */
      zIndex: this.zIndex
    }))
    this.map.addLayer(flashLayer)
  },
  /**
   * 闪烁图层
   * @param {Number | String} latitude 经度
   * @param {Number | String} longitude 纬度
   * @param {Number | String} ms 闪烁频率
   * @param {Number | String} num 闪烁次数(默认 +2 次)
   */
  changeSource: function (latitude, longitude, data, ms = 500, num = 10) {
    const [lonlat, times, number] = [
      wgs84togcj02(Number(longitude), Number(latitude)),
      Number(ms),
      Number(num)
    ]
    this.flashLayer.setVisible(true)
    const feature = new Feature({
      geometry: new Point(
        transform([lonlat[0], lonlat[1]], 'EPSG:4326', 'EPSG:3857')
      ),
      data: data
    })
    const features = [feature]
    this.flashLayer.setSource(new VectorSource({ features }))
    feature.setStyle(null)
    this.flash(feature, times, number)
  },
  flash(feature, duration, number) {
    let start = +new Date()
    let listenerKey // to remove the listener after the duration
    let flashCount = 0
    let _this = this
    const animate = function (event) {
      let frameState = event.frameState
      let elapsed = frameState.time - start
      let elapsedRatio = elapsed / duration
      let radius = easeOut(elapsedRatio) * 15 + 5
      let opacity = easeOut(1 - elapsedRatio)
      let style = new Style({
        image: new Circle({
          radius: radius,
          snapToPixel: false,
          stroke: new Stroke({
            color: [204, 51, 51, opacity],
            width: 5.25 + opacity
          })
        })
      })
      feature.setStyle(style)
      if (elapsed > duration) {
        // stop the effect
        if (flashCount > number) {
          _this.flashLayer.setVisible(false)
          unByKey(listenerKey)
          return
        }
        start = new Date().getTime()
        flashCount++
      }
      _this.map.render()
    }
    listenerKey = this.map.on('postcompose', animate)
  },
  drawCircleSource(lat, lon) {
    if (this.drawCircleLayer) {
      this.map.removeLayer(this.drawCircleLayer)
    }
    let drawCircleLayer = (this.drawCircleLayer = new VectorLayer({
      source: new VectorSource({}),
      name: 'drawCircleVector',
      zIndex: 2
    }))
    this.map.addLayer(drawCircleLayer)
    let lnglat = wgs84togcj02(lon, lat)
    lon = lnglat[0]
    lat = lnglat[1]
    var feature = new Feature({
      geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
    })
    let features = []
    features.push(feature)
    let vectorSource = new VectorSource({
      features: features
    })
    this.drawCircleLayer.setSource(vectorSource)
    var style = new Style({
      image: new Circle({
        radius: 15,
        snapToPixel: false,
        stroke: new Stroke({
          color: [204, 51, 51, 1],
          width: 4
        })
      })
    })
    this.drawCircleLayer.setStyle(style)
  }
}

export default flashFeatureLayer
