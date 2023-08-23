import { useState, useContext, useEffect } from 'react'
import Entall from "./Entall"
import Equipmentall from "./Equipmentall"
import Electricitytrends from "./Electricitytrends"
import EnterprisesAlarmsSituation from './EnterprisesAlarmsSituation'
import RankingSituation from './RankingSituation'
import LeadStatistics from './LeadStatistics'
import './index.scss'
const Content = ({ children }) => {
    return (
        <div className='Content'>
            <div className='Content-header'>
                 <div  className='header-image'></div>
                 <div className='header-text'>北京市大气污染源重点企业用电监控平台</div>
            </div>
            <div className='Content-center'>
                <div className='Content-left'>
                    <Entall></Entall>
                    <Equipmentall></Equipmentall>
                    <Electricitytrends></Electricitytrends>
                </div>
                {children}
                <div className='Content-right'>
                    <EnterprisesAlarmsSituation />
                    <LeadStatistics />
                    <RankingSituation />
                </div>
            </div>

        </div>
    )
}
export default Content