export const options = {
  backgroundColor: '#fff',
  color: ['#d02d22', '#3375ef'],
  tooltip: {
    trigger: 'axis'
  },
  title: {
    text: '',
    left: 'center'
  },
  legend: {
    // data: ['本周12-08 - 12-11', '上周12-01 - 12-15'],
    right: 20
  },
  grid: {
    left: '0%',
    right: '4%',
    bottom: '3%',
    top: '19%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // data: ['一', '二', '三', '四', '五', '六', '日'],
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
    show: true,
    type: 'value',
    // axisTick: {
    //   show: false,
    // },
    name: '用电指数'
    // nameGap: 50,  // y轴name与横纵坐标轴线的间距
  },
  series: [
    {
      // name: '本周12-08 - 12-11',
      name: '',
      type: 'line',
      animation: false,
      symbol: 'circle',
      data: []
    }
    // {
    //   name: '上周12-01 - 12-15',
    //   type: 'line',
    //   animation: false,
    //   symbol: 'circle',
    //   data: [],
    // },
  ]
}
