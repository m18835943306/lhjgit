import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import ClusterSource from 'ol/source/Cluster'

// import { judgeLngAndLat } from '../utils/layers';
import { judgeLngAndLat } from '&/commonjs/layers.help'
// import { wgs84togcj02 } from "../utils/coordinate";
import { wgs84togcj02 } from '&/commonjs/coordinateUtils'
// import { getBgColorForHourNew } from '@/utils/pollution.js';

const commonPointLayer = {
  addFeature(pointData, sourceType) {
    // console.log(pointData,"pointDatapointDatapointDatapointData");
    let featuresArr = []
    let feature
    // 循环添加feature
    // if (!Array.isArray(pointData)) {
    //   throw new Error("current layer needs an Array")
    // }
    let dataList = pointData.filter(judgeLngAndLat)
    //  console.log(dataList,"dataListdataListdataList");
    for (let i = 0; i < dataList.length; i++) {
      // 创建feature，一个feature就是一个点坐标信息
      let info = dataList[i]
      // console.log(info,"infoinfoinfoinfoinfoinfo");
      if (
        !info.wgs84_lng ||
        !info.wgs84_lat ||
        Number(info.wgs84_lat) >= Number(info.wgs84_lng)
      )
        continue
      let coordinates = wgs84togcj02(
        Number(info.wgs84_lng),
        Number(info.wgs84_lat)
      )
      feature = new Feature({
        geometry: new Point(
          transform([coordinates[0], coordinates[1]], 'EPSG:4326', 'EPSG:3857')
        ),
        data: info,
        name: sourceType
      })
      featuresArr.push(feature)
    }

    // 创建图层要素
    let source = new VectorSource()

    // 聚合图层数据源
    let clusterSource = new ClusterSource({
      source: source,
      distance: 20
    })

    // 设置图层
    let vector = new VectorLayer({
      source: pointData?.length > 500 ? clusterSource : new VectorSource(),
      renderMode: 'image',
      zIndex: 2
    })
    return { vector, featuresArr, source }
  },
  styleValue(f) {
    let o = f.get('data')
    // console.log(o,"oooooooooooooooooooooooooo");
    return { o }
  }
}

export default commonPointLayer
