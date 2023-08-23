import React, { useState, useEffect } from "react";
import { Card } from '&/appComponents/Antd'
import { Row, Col, Table } from 'antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'
const Content = ({ data }) => {
    const [option, setOption] = useState()
    const [options, setOptions] = useState()
    const columns = [
        {
            width: 100,
            title: '时间',
            dataIndex: 'ent_name',
            key: 'ent_name',
            align: 'center'
        }
    ]
    useEffect(() => {
        if (data) {
            // console.log(data,"data--");
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['原始日间用电', '原始夜间用电', '日间用电同比','夜间用电同比', '日间用电环比', '夜间用电环比'],
                    padding:[0,100,0,0],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top:"10%",
                    // containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: [0, 0.01],
                    data: data?.time_list
                },
                yAxis: [
                    {
                        type: 'value',
                    },
                    {
                        type: 'value',
                        // name: 'Temperature',
                        // min: 0,
                        // max: 25,
                        // interval: 5,
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
                ],
                series: [
                    {
                        name: '原始日间用电',
                        type: 'bar',
                        data: data?.cur_data?.day
                    },
                    {
                        name: '原始夜间用电',
                        type: 'bar',
                        data: data?.cur_data?.night
                    },
                    {
                        name: '日间用电同比',
                        type: 'line',
                        yAxisIndex: 1,
                        data: data?.same_data?.day
                    },
                    {
                        name: '夜间用电同比',
                        type: 'line',
                        yAxisIndex: 1,
                        data: data?.same_data?.night
                    },
                    {
                        name: '日间用电环比',
                        type: 'line',
                        data: data?.ring_data?.day,
                        yAxisIndex: 1,
                    },
                    {
                        name: '夜间用电环比',
                        type: 'line',
                        data: data?.ring_data?.night,
                        yAxisIndex: 1,
                    }

                ]
            };
            setOption(option)
            const options = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  top: '0%',
                  left: 'center'
                },
                series: [
                  {
                    // name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 12,
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data:[
                        {name:"日间用电总量",value:data?.pie_data?.day?.toFixed(2)},
                        {name:"夜间用电总量",value:data?.pie_data?.night.toFixed(2)}
                    ]
                  }
                ]
              };
            setOptions(options)
        }
    }, [data])
    return (
        <div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', gap: '10px' }} className="content">
            <Card size="small" title="用电量刷色图" style={{ flex: 1 }} bodyStyle={{ height: 'calc(100% - 38px)' }}>
                <Table bordered columns={columns} dataSource={[]} scroll={{ y: "22vh" }} pagination={false}></Table>
            </Card>
            <Card size="small" title="日间用电量和夜间用电量的变化趋势、占比图" style={{ flex: 1 }}  bodyStyle={{ height: 'calc(100% - 38px)' }}>
                <div className="echarts">
                    <div className="echarts-left"><Echarts option={option}></Echarts></div>
                    <div className="echarts-right"><Echarts option={options}></Echarts></div>
                </div>
            </Card>
            <Card size="small" title="生产模式" style={{ flex: 1 }}  bodyStyle={{ height: 'calc(100% - 38px)' }}>

            </Card>
        </div>

    )
}
export default Content