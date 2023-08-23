import { useState, useContext, useEffect } from 'react'
import { Select } from 'antd'
import { getAdmList,getIndustryList} from '&/api/electricity'
import Echarts from '&/baseUI/EChartsUI';
import _ from "lodash"
import './index.scss'
const EchartsData = ({ params, onQuery, setParams, topOptions, bottomOptions }) => {
  const [countValues,setCountValues]=useState([])
  const [industryValues,setIndustryValues]=useState([])
  useEffect(() => {
    if (params.type == "2" ) {
      // 调用接口
      getAdmListRequest()
    }else if(params.type == "3"){
      getIndustryListRequest()
    }
  }, [params.type])
  // 区的接口
   const getAdmListRequest=async()=>{
       const res=await getAdmList({adm_level:"3"})
       setCountValues(res)
   }
  //  行业的接口
  const getIndustryListRequest=async()=>{
      const result =await getIndustryList()
         setIndustryValues(result)
  }
  const onChangeType = (types, selectdata) => {


    if (types == "1") {
      const a = _.cloneDeep(params);
      a.type = types;
      delete a.county_id
      delete a.industry_type_id
      setParams(a);
      onQuery && onQuery(a);
    } else if (types == "2") {
      const a = _.cloneDeep(params);
      a.type = types;
      if(selectdata){
        a.county_id = selectdata;
        delete a.industry_type_id
        onQuery && onQuery(a);
      }
      setParams(a);
    } else {
      const a = _.cloneDeep(params);
      a.type = types;
      if(selectdata){
        a.industry_type_id = selectdata;
        delete a.county_id
        onQuery && onQuery(a);
      }
      setParams(a);
    }

  };
  return (
    <div className='EchartsData'>
      <div className='EchartsData-type'>
        <div className='EchartsData-typeleft'>
          <div
            className={params?.type === '1' ? 'Activeli' : 'OutActiveli'}
            onClick={() => {
              onChangeType('1');
            }}
          >市</div>
          <div
            className={params?.type === '2' ? 'Activeli' : 'OutActiveli'}
            onClick={() => {
              onChangeType('2',3);
            }}
          >各区</div>
          <div
            className={params?.type === '3' ? 'Activeli' : 'OutActiveli'}
            onClick={() => {
              onChangeType('3',2);
            }}
          >各行业</div>
        </div>
        {
          params.type == "2" ?
            <div className='EchartsData-typeright'>
              <Select
                // allowClear
                placeholder={`请选择`}
                // defaultValue={3}
                value={params?.county_id}
                onChange={(v) => onChangeType(params.type, v)}
              >
                {
                  countValues&&countValues.map(item=>{
                    return  <Select.Option value={item.county_id}>
                    {item.county_name}
                  </Select.Option>
                  })
                }
              </Select>
            </div> : null
        }
        {
           params.type == "3" ?
            <div className='EchartsData-typeright'>
              <Select
                // allowClear
                placeholder={`请选择`}
                // defaultValue={2}
                value={params?.industry_type_id}
                onChange={(v) => onChangeType(params.type, v)}
              >
                {
                  industryValues&&industryValues.map(item=>{
                    return  <Select.Option value={item.industry_type_id}>
                    {item.industry_type}
                  </Select.Option>
                  })
                }
              </Select>
            </div> : null
        }
      </div>
      <div className='EchartsData-eachers'>
        <div className='EchartsData-topeachers'>
          <Echarts option={topOptions && topOptions}></Echarts>
        </div>
        <div className='EchartsData-bottomeachers'>
          <Echarts option={bottomOptions && bottomOptions}></Echarts>
        </div>
      </div>
    </div>
  )
}
export default EchartsData;