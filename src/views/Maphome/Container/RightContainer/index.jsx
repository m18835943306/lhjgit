import React, { useState, useEffect } from 'react'
import RankingSituation from './RankingSituation'
import LeadStatistics from './LeadStatistics'
import AlermInfo from './AlermInfo'

const RightContainer = () => {
  return (
    <div className="Container-right">
      <AlermInfo />
      <LeadStatistics />
      <RankingSituation />
    </div>
  )
}

export default RightContainer
