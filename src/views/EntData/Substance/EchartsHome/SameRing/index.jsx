import React,{ useEffect,useState,useContext } from 'react'
import Echarts from '&/baseUI/EChartsUI'
import { Context } from '../../context'
import { cloneDeep } from 'lodash';
 const options = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              show:true
            },
            grid: {
              left: '2%',
              right: '2%',
              top: '12%',
              bottom: '14%'
            },
            xAxis: [
              {
                type: 'category',
                axisPointer: {
                  type: 'shadow'
                },
                position: 'bottom',
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '用电指数',
                splitLine: {
                  show: false
                },
                axisTick: { show: false }
              }
            ],
            series: []
          }

const SameRing=()=>{
    const{ entRingData,paramsData} = useContext(Context);
    const [option, setoption] = useState({});

    const getSeries=(list=[])=>{
      return list.map(item=>{
        return{
          type:'bar',
          smooth:true,
          data:item.data,
          name:item.name
        }
      })
    }

    const getOptions=(entRingData)=>{
      const cloneOption = cloneDeep(options)
      const { data_info } = entRingData;
      const devData=data_info[paramsData.dev_type];  
      const list=[{
        name:paramsData.dev_type,
        data:devData?.cur
      },{
        name:'环比',
        data:devData?.ring
      },{
        name:'同比',
        data:devData?.same
      },{
        name:'同比增量',
        data:devData?.same_incr
      },{
        name:'环比增量',
        data:devData?.ring_incr
      }];
      cloneOption.series=getSeries(list)
       return cloneOption
    
    }


    useEffect(() => {
      if(entRingData){
        setoption({})
        setoption(getOptions(entRingData))
      }

    }, [entRingData,paramsData])
    return (
      <div style={{height:'100%' }}>
        <Echarts option={option}  width={'100%'}  />
        </div>
    )
}

export default SameRing