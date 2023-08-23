import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import _ from "lodash"
import './index.scss';
const AirEcharts = ({ params, setParams, onQuery, airX, airY }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (airY.length > 0 && airX.length > 0) {
      const option = {
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: airX,
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
            data: airY,
            type: 'line',
            itemStyle: {
              color: '#fe4444',
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
                    color: '#fff1f1', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#fedbdb', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      setOptions(option);
    }
  }, [airX, airY]);
  const onChangePollutant = (pollutants) => {
    const a = _.cloneDeep(params);
    a.varid = pollutants;
    setParams(a);
    onQuery && onQuery(a);
  };
  return (
    <div className="AirEcharts">
      <div className="AirEcharts-left">空气质量变化</div>
      <div className="AirEcharts-pollutant">
        <div
          className={params?.varid === '209002' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('209002');
          }}
        >
          AQI
        </div>
        <div
          className={params?.varid === '134004' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('134004');
          }}
        >
          PM<sub>2.5</sub>
        </div>
        <div
          className={params?.varid === '134002' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('134002');
          }}
        >
          PM<sub>10</sub>
        </div>
        <div
          className={params?.varid === '121026' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('121026');
          }}
        >
          SO<sub>2</sub>
        </div>
        <div
          className={params?.varid === '121004' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('121004');
          }}
        >
          NO<sub>2</sub>
        </div>
        <div
          className={params?.varid === '121005' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('121005');
          }}
        >
          CO
        </div>
        <div
          className={params?.varid === '105024' ? 'Activeli' : 'OutActiveli'}
          onClick={() => {
            onChangePollutant('105024');
          }}
        >
          O<sub>3</sub>
        </div>
      </div>
      {airY.length > 0 ? (
        <div className="AirEcharts-eachers">
          <Echarts option={options} />
        </div>
      ) : (
        <div className="AirEcharts-eachers-kong">暂无数据</div>
      )}
    </div>
  );
};
export default AirEcharts;
