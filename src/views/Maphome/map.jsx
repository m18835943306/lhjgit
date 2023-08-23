import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useRef,
  useCallback
} from 'react'
import { XYZ, TileWMS, Vector as VectorSource } from 'ol/source'
import { Style, Icon, Fill, Stroke, Text, Circle } from 'ol/style'
import { transform } from 'ol/proj'
import Map, { Layer, useObservable } from '@ysrd/ol5-react-ts'
import flashFeatureLayer from './layers/flashFeatureLayer'
import _, { debounce } from 'lodash'
import { getBaseMap } from '@ysrd/ol5-react-ts/utils'
import {
  OpenlayersContext,
  ContentlayersContext
} from '@ysrd/ol5-react-ts/context'
import { generatorVectorSource } from '@ysrd/ol5-react-ts/utils'
import OlMap from 'ol/Map'
import View from 'ol/View'
import VectorLayer from 'ol/layer/Vector'
import dayjs from 'dayjs'
import { defaults as defaultControls } from 'ol/control'
import { getHomeEnterpriseList, getEnterpriseData } from '@/api/electricity'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import sourceImg from '&/assets/images/imgs'
import './index.scss'

const Maphome = () => {
  const {
    setModalVisible,
    setModalType,
    modalType,
    modalVisible,
    user,
    setMaps,
    setLayers,
    info,
    setInfo
  } = useContext(ContentlayersContext)
  const layerRef = useRef(null)
  const base = getBaseMap(2).getSource() //地图底图 根据1,2,3,4切换不同底图

  const [listData, setListData] = useState([])
  const isCenter = useMemo(() => user.role_level === 1, [user.role_level])
  const [map] = useState(
    new OlMap({
      loadTilesWhileAnimating: true,
      pixelRatio: 1,
      controls: defaultControls({
        attribution: false,
        zoom: false,
        rotate: false
      })
    })
  )
  const [mapView] = useState(
    new View({
      projection: 'EPSG:3857'
      // center: transform([116, 40], 'EPSG:4326', 'EPSG:3857'), //以北京为中心
      // zoom: 9,
      // center: transform([116.28, 39.85], 'EPSG:4326', 'EPSG:3857'),
      // 以丰台区为中心,
      // zoom: 12,
    })
  )

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('regionInfo'))
    const { city, county } = info
    const type = (isCenter ? city : county)[0]
    const zoom = isCenter ? 9 : 12
    mapView.setCenter(
      transform([type?.lng, type?.lat], 'EPSG:4326', 'EPSG:3857')
    )
    mapView.setZoom(zoom)
  }, [mapView, isCenter])

  useEffect(() => {
    const loadData = async () => {
      const datatime = dayjs().unix()
      const dataNewtime = dayjs().format('YYYY-MM-DD HH:20:00')
      const databigtime = dayjs(dataNewtime).unix()
      let time
      if (databigtime < datatime) {
        time = dayjs().format('YYYY-MM-DD HH:00:00')
      } else {
        time = dayjs().subtract(1, 'hours').format('YYYY-MM-DD HH:00:00')
      }
      const result = await getHomeEnterpriseList({
        project_id: 225,
        time: time,
        time_type: 1
      })
      setListData(result)
    }
    loadData()
  }, [])

  useEffect(() => {
    setMaps(map)
    if (!layerRef.current) {
      layerRef.current = new flashFeatureLayer(map, 20)
      setLayers(layerRef.current)
    }
  }, [])
  const getRegion = useMemo(
    () => (user.role_level === 1 ? '1' : '2'),
    [user.role_level]
  )

  const getCqlFilter = useMemo(() => {
    const cityType = !isCenter ? 'REGIONID' : 'CITYID'
    return `${cityType}=${getRegion}`
  }, [isCenter, getRegion])

  const addPoint = () => {
    if (!listData || !Array.isArray(listData)) return
    // const styleIcon = IconStyle(layerId);
    let featureSource = generatorVectorSource(listData, {
      lng: 'longitude',
      lat: 'latitude'
    })
    const ponitlayer = new VectorLayer({
      source: featureSource,
      // style: styleIcon,
      zIndex: 3
    })
    map.addLayer(ponitlayer)
    addStyle(ponitlayer)
    ponitlayer.setProperties({ name: 'point', type: 'source' })
    return ponitlayer
  }
  function addStyle(Layers) {
    let index = 0
    Layers.setStyle((f) => {
      const o = f.get('obj')
      // console.log(o, "o-------");
      const url = sourceImg[`dian${o.status}`]
      const changeColor = (o) => {
        switch (o) {
          case 1:
            return 'red'
          case 2:
            return 'orange'
          case 3:
            return 'green'
          case 4:
            return 'gray'

          default:
            break
        }
      }
      return new Style({
        // image: new Icon({
        //   anchor: [0.5, 0.5],
        //   anchorXUnits: IconAnchorUnits.FRACTION,
        //   anchorYUnits: IconAnchorUnits.FRACTION,
        //   src: url,
        //   opacity: 1,
        //   scale: 0.5
        // }),
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: 'white'
          }),
          stroke: new Stroke({
            // 边缘颜色
            color: changeColor(o.status),
            width: 3
          })
        }),
        text: new Text({
          textAlign: 'center',
          textBaseline: 'middle',
          font: 'normal 12px Verdana',
          text: o.warn_count + '',
          fill: new Fill({ color: changeColor(o.status) }),
          offsetX: 0,
          offsetY: 0,
          rotation: 0
        }),
        zIndex: (index += 1)
      })
    })
  }

  useEffect(() => {
    if (listData?.length) {
      addPoint()
    }
  }, [listData])

  // 搜索企业接口
  const getEnterpriseDataquest = async (str) => {
    const res = await getEnterpriseData({
      project_id: user?.project_id,
      ent_name: str
    })
    if (res) {
      layerRef.current.changeSource(
        Number(res.data[0]?.latitude),
        Number(res.data[0]?.longitude),
        res.data[0]
      )
      layerRef.current.drawCircleSource(
        Number(res.data[0]?.latitude),
        Number(res.data[0]?.longitude)
      )
      setLayers(layerRef.current)
    }
  }
  // 搜索企业功能
  const onChange = (e) => {
    if (e.target.value == '') {
      //   getDeviceListNewRequest()
      return
    } else {
      const { value } = e.target
      debounceSearch(value)
    }
  }
  // 调搜索企业名字的接口
  const debounceSearch = useCallback(
    _.debounce((value) => getEnterpriseDataquest(value), 2000),
    []
  )
  useObservable(
    map,
    'singleclick',
    (evts) => {
      // return
      // closeOverlay();

      const pixel = evts.pixel
      const layer = map.forEachLayerAtPixel(pixel, (l) => {
        return l
      })
      if (!layer) {
        return
      }
      let count = 0
      map.forEachFeatureAtPixel(pixel, function (feature) {
        if (count == 0) {
          let l_name = layer.get('name')
          const o = feature.get('obj')
          const data = feature.get('data')
          // setInfo(o)
          switch (l_name) {
            case 'flashVector':
              setModalType(null)
              setModalVisible(true)
              setInfo(data)
              break
            case 'point':
              setModalType(null)
              setModalVisible(true)
              setInfo(o)
              break
          }

          count++
        }
      })
    },
    []
  )
  return (
    <div className="home-container" style={{ position: 'relative' }}>
      <div className="Content-input">
        <Input
          prefix={<SearchOutlined />}
          placeholder="输入企业名称..."
          allowClear
          onChange={onChange}
        />
      </div>
      <OpenlayersContext.Provider
        value={{
          map,
          info,
          user
        }}
      >
        <Map view={mapView}>
          <Layer.Group>
            <Layer.TileLayer source={base} id="tile" />
            <Layer.TileLayer
              source={
                new TileWMS({
                  url: 'https://geoserver-air.i2value.cn/geoserver/hotgrid/wms',
                  params: {
                    LAYERS: 'hotgrid:china_citys_gcj',
                    TILED: true,
                    // cql_filter,
                    STYLES: 'boundary_styles_fill'
                  },
                  serverType: 'geoserver',
                  crossOrigin: 'anonymous'
                })
              }
              name="boundry"
            />
            <Layer.TileLayer
              source={
                new TileWMS({
                  url: 'https://geoserver-air.i2value.cn/geoserver/hotgrid/wms',
                  params: {
                    LAYERS: 'hotgrid:china_regions_gcj',
                    TILED: true,
                    cql_filter: getCqlFilter, //北京市地图边界
                    // cql_filter: 'REGIONID=17',    //丰台区边界
                    STYLES: 'boundary_styles_wide_fill'
                  },

                  serverType: 'geoserver',
                  crossOrigin: 'anonymous'
                })
              }
              zIndex="2"
              name="boundry"
            />
          </Layer.Group>
        </Map>
      </OpenlayersContext.Provider>
    </div>
  )
}

export default Maphome
