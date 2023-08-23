import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import _ from "lodash"
import './index.scss';
const Dinaecharts = ({ params, setParams, onQuery }) => {
  //   const [Electric, setElectric] = useState(params?.dian);
  const [options, setOptions] = useState({});
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      grid: {
        left: '9%',
        top: '30%',
        bottom: '14%',
        right: '8%',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          itemStyle: {
            color: '#0b7bf6',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#e6f2fe', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#cee5fe', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };
    setOptions(option);
  }, []);
  const onChangeDian = (dians) => {
    console.log(dians, 'diandiandian');
    const b = _.cloneDeep(params);
    b.dian = dians;
    // setElectric(dian);
    setParams(b);
    // console.log(params,"paramsparamsparamsparams");
    onQuery && onQuery(b);
  };
  return (
    <div className="Dinaecharts">
      <div className="Dinaecharts-left">宏观用电负荷</div>
      <div className="Dinaecharts-electrc">
        <div
          className={params?.dian === '1' ? 'Activeli' : 'OutActiveli'}
          onClick={() => onChangeDian('1')}
        >
          企业总电
        </div>
        <div
          className={params?.dian === '2' ? 'Activeli' : 'OutActiveli'}
          onClick={() => onChangeDian('2')}
        >
          生产总电
        </div>
      </div>
      <div className="Dinaecharts-eachers">
        <Echarts option={options} />
      </div>
    </div>
  );
};
export default Dinaecharts;
