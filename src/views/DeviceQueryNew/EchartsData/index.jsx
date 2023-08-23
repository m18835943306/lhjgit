import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import dayjs from 'dayjs'
import _ from "lodash"
import './index.scss';
const EchartsData = ({ data, titleLengnd, chartType }) => {
  // console.log(chartType, "data--");
  const timemark = []
  data?.time_list?.map(item => {
    if (dayjs(item).weekday() === 5 || dayjs(item).weekday() === 6) {
      timemark.push({
        xAxis: item,
        name: "周末",
        lineStyle: {
          color: '#fb7603'
        }
      })
    }
  })
  // console.log(timemark, "timemark--");
  const summation_list = data?.summation_list?.map((item) => {
    return {
      type: 'line',
      smooth: true,
      name: item.dev_name,
      data: item.values.map((i) => {
        return i < 0 ? '--' : i;
      }),
    };
  });
  const production_list = data?.production_list?.map((item) => {
    return {
      type: 'line',
      smooth: true,
      name: item.dev_name,
      data: item.values.map((i) => {
        return i < 0 ? '--' : i;
      }),
      markLine: {
        symbol: ['none', 'none'],
        data: timemark,
        label: {
          formatter: function () {
            return ''
          }
        }
      },
    };
  });

  const pollution_control_list = data?.pollution_control_list?.map((item) => {
    return {
      type: 'line',
      smooth: true,
      name: item.dev_name,
      data: item.values.map((i) => {
        return i < 0 ? '--' : i;
      }),
      markLine: {
        symbol: ['none', 'none'],
        data: timemark,
        label: {
          formatter: function () {
            return ''
          }
        }
      },
    };
  });

  let arr = summation_list?.concat(production_list);
  let arr2 = arr?.concat(pollution_control_list);
  const summation_list_name = data?.summation_list?.map((item) => {
    return item.dev_name;
  });

  const production_list_name = data?.production_list?.map((item) => {
    return item.dev_name;
  });

  const pollution_control_list_name = data?.pollution_control_list?.map(
    (item) => {
      return item.dev_name;
    }
  );

  let arrlist = summation_list_name?.concat(production_list_name);
  let arrlist2 = arrlist?.concat(pollution_control_list_name);
  const changeColor = (text) => {
    const color =
      text == 1 ? '#d02d22' : text == 2 ? '#e28336' : '#f6ca49'
    return color
  }
  //默认时的echart数据
  const dataArr = arr2?.map(item => {
    return {
      ...item,
      markArea: {

        data: data?.warn_info?.filter(it => item.name == it.dev_name).map(i => {
          return [{
            xAxis: i.start_time, itemStyle: {
              color: changeColor(i.warn_level)
            },
          }, {
            xAxis: i.end_time, itemStyle: {
              color: changeColor(i.warn_level)
            },
          }]
        })
      }
    }
  })
  const dataArrMoRen=_.cloneDeep(dataArr)?.map(item => {
    delete item.markLine
    delete item.markArea
    return item
  })
  // //报警时的echart数据
  const dataArrpolice = _.cloneDeep(dataArr)?.map(item => {
    delete item.markLine
    return item
  })
  // //周末时的echart数据
  const dataArrWeek = _.cloneDeep(dataArr)?.map(item => {
    delete item.markArea
    return item
  })
  const NewdataArr=(chartType=="0"?dataArrMoRen:chartType=="1"?dataArrWeek:dataArrpolice)
  // console.log(NewdataArr,"NewdataArr==");
  const option = {
    tooltip: {
      trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
      axisPointer: {
        //坐标轴指示器，坐标轴触发有效，
        type: 'line', //默认为line，line直线，cross十字准星，shadow阴影
        crossStyle: {
          color: '#fff',
        },
      },
    },
    toolbox: {
      show: true,
      right: '0px',
      top: "15px",
      feature: {
        // 下载保存为图片
        saveAsImage: {
          show: true,
          // icon: `image://${echartsDown}`, // 内部相对路径
          // connectedBackgroundColor: '#fff',
          title: '保存图片',
          type: 'png',
          pixelRatio: 1,
        },
      },
    },
    grid: {
      // right:"-4%",
      bottom: "6%"
    },
    legend: {
      data: arrlist2 && arrlist2,
    },
    xAxis: {
      type: 'category',
      data: data?.time_list,
    },
    yAxis: {
      type: 'value',
    },
    series: NewdataArr,
  };
  return (
    <div className="EchartsData">
      <Echarts option={option} />
    </div>
  );
};
export default EchartsData;
