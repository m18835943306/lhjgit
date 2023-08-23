import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import _ from "lodash"
import './index.scss';
const PoliceEacharts = ({ params, setParams, onQuery }) => {
  const [options, setOptions] = useState({});
  const [optionsSeconds, setOptionsSeconds] = useState({});
  const [optionsThrees, setOptionsThrees] = useState({});
  useEffect(() => {
    const option = {
      tooltip: {
        show: true,
      },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              // fontWeight: 'bold'
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
          ],
        },
      ],
    };
    setOptions(option);
    const optionsSecond = {
      tooltip: {
        show: true,
      },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              // fontWeight: 'bold'
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
          ],
        },
      ],
    };
    setOptionsSeconds(optionsSecond);
    const optionThree = {
      tooltip: {
        show: true,
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
      },
      xAxis: {
        type: 'category',
        data: ['颗粒物', 'VOCs', 'NO2', 'SO2'],
      },
      series: [
        {
          name: '实际排放量',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: '预估减排量',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
        {
          name: '无措施预计排放总量',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    };
    setOptionsThrees(optionThree);
  }, []);
  const onChangePolice = (polices) => {
    const c = _.cloneDeep(params);
    c.police = polices;
    setParams(c);
    onQuery && onQuery(c);
  };
  return (
    <div className="PoliceEacharts">
      <div className="PoliceEacharts-left">报警与减排测算</div>
      <div className="PoliceEacharts-electrc">
        <div
          className={params?.police === '1' ? 'Activeli' : 'OutActiveli'}
          onClick={() => onChangePolice('1')}
        >
          区域报警
        </div>
        <div
          className={params?.police === '2' ? 'Activeli' : 'OutActiveli'}
          onClick={() => onChangePolice('2')}
        >
          行业报警
        </div>
      </div>
      <div className="PoliceEacharts-eachers">
        <div className="PoliceEacharts-eachers-left">
          <div className="PoliceEacharts-eachers-left-first">
            <Echarts option={options} />
          </div>
          <div className="PoliceEacharts-eachers-left-second">
            <Echarts option={optionsSeconds} />
          </div>
        </div>
        <div className="PoliceEacharts-eachers-right">
          <Echarts option={optionsThrees} />
        </div>
      </div>
    </div>
  );
};
export default PoliceEacharts;
