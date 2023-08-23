export const option = {
  tooltip: {
    trigger: 'axis'
    // formatter: '{b} <br/>{a}：{c}KW',
  },
  legend: {
    show: true,
    top: 10,
    icon: 'circle'
  },
  // dataZoom: [
  //   {
  //     start: 0,
  //     end: 20,
  //     type: 'inside',
  //     moveOnMouseWheel: false, // 内部滚动条使用鼠标滚轮滚动
  //     zoomOnMouseWheel: true // 鼠标滚轮放大缩小
  //   },
  //   {
  //     start: 0,
  //     end: 20,
  //     type: 'slider',
  //     height: 10,
  //     bottom: 7
  //   }
  // ],
  grid: {
    left: '3%',
    top: '10%',
    bottom: '10%',
    right: '2%'
  },
  xAxis: {
    data: [],
    axisTick: {
      show: false
    }
  },
  yAxis: {
    name: '单位KW',
    nameTextStyle: {
      align: 'right'
    },
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel: {
      margin: '12'
    }
  },
  series: [
    {
      type: 'line',
      name: '生产总电量',
      data: []
    }
    // {
    //   type: 'line',
    //   name: '电炉总电量',
    //   showSymbol: false,
    //   data: [],
    // },
  ]
}
