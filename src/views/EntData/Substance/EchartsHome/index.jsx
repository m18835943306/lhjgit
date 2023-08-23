import { Col, Row,Button,Card} from 'antd'
import React,{useState,useEffect,useContext} from 'react'
import { Card as MyCard } from '&/appComponents/Antd'
import EleAll from './EleAll'
import SameRing from './SameRing'
import {Context} from '../context.js'




const EchartsHome = () => {
  const {rankData} = useContext(Context);
  const [industryOn,setIndustryOn]=useState(false)
  const [areaOn,setAreaOn]=useState(false)
  const [seletedObj, setSelectedObj] = useState([])

  
  const IndusrtyHandleClick = () => {
    setIndustryOn(prev => !prev);
  };
  const AreaHandleClick = () => {
    setAreaOn(prev => !prev);
  }

  const TextCard=({children})=>{
return <Card style={{ marginRight:'10px',flex:1}}  bodyStyle={{ height: 'calc(100% - 38px)' }}>
  {children}
</Card>
  }


  return (
    <div  style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', gap:'10px'}} >
    <div style={{flex:1,display:'flex',flexDirection:'row' , height: 'calc(100% - 38px)'}}>
    <TextCard>
          <h3>企业用电量： kwh</h3>
    </TextCard>
    <TextCard>
          <h3>用电量占比：</h3>
          <h3>行业占比：</h3>
          <h3>区级占比：</h3>
        </TextCard>
        <TextCard >
          <h3>用电量排名</h3>
          <h4>全市：</h4>
          <h4>区内：</h4>
          <h4>行业：</h4>
        </TextCard>
        <TextCard >
        <h3>用电量同比变幅排名</h3>
          <h4>全市：{rankData?.city_rank}</h4>
          <h4>区内：{rankData?.county_rank}</h4>
          <h4>行业：{rankData?.industry_rank}</h4>
        </TextCard>
    </div>
      
        <MyCard size="small" title="企业用电量变化趋势" style={{ width: '100%', flex:2  }}  bodyStyle={{ height: 'calc(100% - 38px)' }}
        extra={
          <div style={{flex:"no-wrap",display:"flex",alignItems:"center", gap: '10px'}}>
            <Button 
            type={industryOn ? 'primary':'default'}
            onClick={IndusrtyHandleClick}
            >行业均值</Button>
            <Button
            type={areaOn ? 'primary':'default'}
            onClick={AreaHandleClick}
            >区均值</Button>
         
          </div>
        } >
          <EleAll industryOn={industryOn} areaOn={areaOn} 
          />
        </MyCard>
    
     
        <MyCard size="small" title="企业用电量同比、环比" style={{ width: '100%',flex:2, marginBottom:'.625rem'}}  bodyStyle={{ height: 'calc(100% - 38px)' }}
 >
          <SameRing />
        </MyCard>
    </div>
  )
}

export default EchartsHome