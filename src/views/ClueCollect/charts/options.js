export const options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: false
  },
  grid: {
    left: '0%',
    right: '4%',
    bottom: '3%',
    top: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    show: false
  },
  series: [
    {
      // name: '本周12-08 - 12-11',
      type: 'line',
      stack: 'Total',
      symbol: 'circle',
      data: []
    }
  ]
}
const labelSetting = {
  show: true,
  position: 'right',
  offset: [10, 0],
  fontSize: 16,
  opacity: 1,
  formatter: () => {
    return `a       asad`
  }
}
export const option1 = {
  // title: {
  //   text: 'Vehicles in X City',
  // },
  legend: {
    show: false
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    containLabel: true,
    left: 20,
    top: 10
  },
  yAxis: {
    data: [],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      margin: 30,
      fontSize: 14
    },
    axisPointer: {
      label: {
        show: true,
        margin: 30
      }
    }
  },
  xAxis: {
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  series: [
    {
      name: '2015',
      type: 'pictorialBar',
      label: false,
      symbol: 'roundRect',
      symbolRepeat: true,
      symbolSize: ['40%', '60%'],
      data: []
    },
    {
      name: '2015',
      type: 'pictorialBar',
      label: labelSetting,
      symbol: 'roundRect',
      symbolRepeat: true,
      symbolSize: ['40%', '60%'],
      tooltip: {
        trigger: 'none'
      },
      itemStyle: {
        opacity: 0.2,
        color: '#000'
      },
      data: []
    }
  ]
}
