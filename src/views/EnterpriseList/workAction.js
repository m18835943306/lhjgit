/**
 * soil 所有土壤类型
 * soil_1_1,耕地;soil_1_2,园地;soil_1_3,林地
 * soil_3_1,公园;soil_3_2,绿地
 * soil_4_1,在产;soil_4_2,停产
 * soil_2_1,未利用地
 */
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, Polygon } from 'ol/geom'
import { Style, Icon, Fill, Stroke, Text } from 'ol/style'
import { transform } from 'ol/proj'
import { wgs84togcj02 } from '@ysrd/ol5-react-ts/utils'
import imageIcon from '@/images/electricity/qiye.png'

let workAction = function (map, layerName, zindex) {
  if (!(this instanceof workAction)) {
    return new workAction(map)
  }
  this.map = map
  this.layerName = layerName
  this.zindex = zindex
  this.init(map)
}

workAction.prototype = {
  init() {
    let layer = (this.layer = new VectorLayer({
      source: new VectorSource({}),
      name: this.layerName,
      zIndex: this.zindex
    }))
    this.map.addLayer(layer)
  },
  show() {
    this.layer.setVisible(true)
  },
  hide() {
    this.layer.setVisible(false)
  },
  changeSource(result, showValue) {
    if (result.length > 0) {
      let features = []
      let code = ''
      result.map((item) => {
        let { latitude, longitude } = item
        let lnglat = wgs84togcj02(longitude, latitude)
        features.push(
          new Feature({
            geometry: new Point(transform(lnglat, 'EPSG:4326', 'EPSG:3857')),
            point: 'point',
            o: item
          })
        )
      })

      this.setSourceStyles(features)
      this.show()
    } else {
      this.layer.setSource(new VectorSource({}))
    }
  },

  setMapCenter(lon, lat, zoom) {
    // console.log(lon,lat,zoom,11111111111111111111);
    let lnglat = wgs84togcj02(lon, lat)
    this.map
      .getView()
      .setCenter(transform([lnglat[0], lnglat[1]], 'EPSG:4326', 'EPSG:3857'))
    this.map.getView().setZoom(zoom)
    let featdian = []
    featdian.push(
      new Feature({
        geometry: new Point(transform(lnglat, 'EPSG:4326', 'EPSG:3857')),
        point: 'point'
      })
    )

    // console.log(lnglat,zoom,"-----------------");
    this.setSourceStyles(featdian)
  },

  setSourceStyles(features) {
    this.layer.setSource(
      new VectorSource({
        features
      })
    )

    this.layer.setStyle((f) => {
      return new Style({
        image: new Icon({
          anchor: [0.5, 14],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: imageIcon,
          opacity: 1,
          scale: 1
        })
      })
    })
  },

  getText(data) {
    return new Text({
      textAlign: 'center',
      textBaseline: 'middle',
      font: 'normal 12px Verdana',
      text: data,
      fill: new Fill({ color: '#000' }),
      offsetX: 0,
      offsetY: 3,
      rotation: 0
    })
  }
}

export default workAction
