import React, { useEffect, useState, Suspense } from 'react';
import Overlay from 'ol/Overlay';
import flashPoint from '../layers/flashPoint';
import './style.scss';
let popupOverlay;
const Popup = (props) => {
  let { map, leftWords, rightWords } = props;
  const [popupInfo, setPopupInfo] = useState();
  const [featureCode, setFeatureCode] = useState('');

  useEffect(() => {
    addPopup();
  }, []);
  const addPopup = () => {
    // 添加点击事件
    popupOverlay = new Overlay({
      element: document.getElementById('popup'),
      // position: evt.coordinate,
      positioning: 'bottom-center',
      autoPan: true, // 如果弹窗在底图边缘时，底图会移动
      autoPanAnimation: {
        // 底图移动动画
        duration: 250,
      },
      stopEvent: false,
    });
    // map.on('singleclick', (evt) => {
    //   let pixel = map.getEventPixel(evt.originalEvent);
    //   //判断当前单击处是否有要素，捕获到要素时弹出popup
    //   let isFeatureArr = map.forEachFeatureAtPixel(pixel, (feature) => feature);
    //   // console.log(isFeatureArr,"isFeatureArr");
    //   let feature = isFeatureArr?.get('features')
    //     ? isFeatureArr?.get('features')[0]
    //     : isFeatureArr;
    //   let info;
    //   if (feature) {
    //     let coordinates = feature.getGeometry().getCoordinates();
    //     const isInfoArr = map.getFeaturesAtPixel(evt.pixel)[0];
    //     info = isInfoArr?.get('features')
    //       ? isInfoArr?.get('features')[0]
    //       : isInfoArr;
    //     setPopupInfo(info);
    //     setFeatureCode(feature.values_.data.code); // 这个为该点的数据
    //     setTimeout(() => {
    //       popupOverlay.setPosition(coordinates);
    //     }, 0);

    //     feature.values_.name == 'micro'
    //       ? flashPoint.setFlashPoint(map, info, popupOverlay)
    //       : flashPoint.removeFlashPoint(map, popupOverlay);
    //     // flashFeatureLayer.setFlashLayer(map, info)
    //     // flashFeatureLayer.drawCircleSource(map, info)
    //     map.addOverlay(popupOverlay);
    //     // getSitedetailsInfos()
    //   } else {
    //     popupOverlay.setPosition(undefined);
    //     flashPoint.removeFlashPoint(map, popupOverlay);
    //   }
    // });
  };

  const onClosePopup = () => {
    popupOverlay.setPosition(undefined);
    flashPoint.removeFlashPoint(map, popupOverlay);
  };
  return (
    <div id="popup" className="ol-popup">
      <div className="close">
        <svg
          onClick={() => onClosePopup()}
          t="1628341101560"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1989"
          width="48"
          height="48"
        >
          <path
            d="M512 444.16l297.088-297.088c17.088-17.152 46.208-15.872 64.96 2.88 18.752 18.752 20.032 47.872 2.88 64.96L579.904 512l297.024 297.088c17.152 17.088 15.872 46.208-2.88 64.96-18.752 18.752-47.872 20.032-64.96 2.88L512 579.904l-297.088 297.024c-17.088 17.152-46.208 15.872-64.96-2.88-18.752-18.752-20.032-47.872-2.88-64.96L444.096 512 147.072 214.912c-17.152-17.088-15.872-46.208 2.88-64.96 18.752-18.752 47.872-20.032 64.96-2.88L512 444.096z"
            fill="#ffffff"
            p-id="1990"
          ></path>
        </svg>
      </div>
      <div>1111111111111</div>
      <div>1111111111111</div>
      <div>1111111111111</div>
      <div>1111111111111</div>
      <div>1111111111111</div>
      <div>1111111111111</div>
      <div className="triangle" />
    </div>
  );
};
export default Popup;
