export default {
  tooltip: {
    trigger: 'axis' //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
    // axisPointer: {
    //   //坐标轴指示器，坐标轴触发有效，
    //   type: 'shadow' //默认为line，line直线，cross十字准星，shadow阴影
    // }
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
  toolbox: {
    show: true,
    right: '0px',
    top: '15px',
    feature: {
      // 下载保存为图片
      saveAsImage: {
        show: true,
        // icon: `image://${echartsDown}`, // 内部相对路径
        // connectedBackgroundColor: '#fff',
        title: '保存图片',
        type: 'png',
        pixelRatio: 1
      }
    }
  },
  grid: {
    right: 30,
    left: 30,
    bottom: 20
  },
  legend: {
    show: true
    // data: []
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    name: 'kw·h',
    nameTextStyle: {
      align: 'right'
    },
    type: 'value'
    // splitLine: {
    //   show: false
    // }
  },
  series: []
}
