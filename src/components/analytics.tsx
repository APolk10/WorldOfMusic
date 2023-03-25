import * as React from 'react';
import { useState } from 'react';

interface AnalyticsProps {
  countryClickData: any[]
}

const Analytics: React.FC<AnalyticsProps> = () => {
  const[isActive, setActive] = useState(false);

  return (
    <div className='analyticsBar'>
      { isActive ? <p className='inactiveAnalytics'>Analytics</p> : <p className='activeAnalytics'>Analytics</p>}
    </div>
  )
}

export default Analytics
