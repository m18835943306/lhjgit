import React, { useState, useEffect } from 'react'
import HomeImg from '@/assets/maphomeimages/imgs'
import EntInfo from './EntInfo'
import DevInfo from './DevInfo'
import EleInfo from './EleInfo'

const LeftContaine = () => {
  return (
    <div className="Container-left">
      <EntInfo />
      <DevInfo />
      <EleInfo />
    </div>
  )
}

export default LeftContaine
