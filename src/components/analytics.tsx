import * as React from 'react';
import { useState } from 'react';
import DataBox from './dataBox';

interface AnalyticsProps {
  countryClickData: any[]
}

const Analytics: React.FC<AnalyticsProps> = () => {
  const[isActive, setActive] = useState(false);

  const handleAnalyticsBarClick = () => {
    setActive(true);
  }
  return (
    <div className='analyticsBar' onClick={handleAnalyticsBarClick}>
      { isActive ? <p className='inactiveAnalytics'>Global Analytics</p> : <p className='activeAnalytics'>Global Analytics</p> }
      {/* send data to navbar to render */}
    </div>
  )
}

export default Analytics
