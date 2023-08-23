import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import _ from "lodash"
import HomeImg from '&/assets/maphomeimages/imgs'
import './index.scss';

const EchartsNum = ({ text, checktext, params, setParams, onQuery, options }) => {
  const onChangeDian = (dians) => {
    const b = _.cloneDeep(params);
    b.dian = dians;
    setParams(b);
    onQuery && onQuery(b);
  };
  return (
    <div className="Equipmentall-EchartsNum">
      <div
        className='EchartsNum-text'
        style={{
          'background-image': 'url(' + HomeImg.heng + ')',
          'background-repeat': 'no-repeat',
          'background-size': '100% 100%'
        }}
      >
        <div className='EchartsNum-textchildren'>{text}</div>
        {
          params.typedata == "2" ? <div className='EchartsNum-check'>
            <div
              className={params?.dian === '1' ? 'Activeli' : 'OutActiveli'}
              onClick={() => onChangeDian('1')}
            >{checktext[0]}</div>
            <div
              className={params?.dian === '2' ? 'Activeli' : 'OutActiveli'}
              onClick={() => onChangeDian('2')}
            >{checktext[1]}</div>
          </div> : null
        }

      </div>
      <div className='EchartsNum-echars'>
        <Echarts option={options && options}></Echarts>
      </div>
    </div>
  );
};

export default EchartsNum;