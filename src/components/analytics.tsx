import * as React from 'react';
import { useState } from 'react';

interface AnalyticsProps {
  toggle(mode: string):void,
}

const Analytics: React.FC<AnalyticsProps> = ({ toggle }) => {
  const[isActive, setActive] = useState(false);

  const handleAnalyticsBarClick = () => {
    toggle('global');
  }

  return (
    <div className='analyticsBar'>
      { isActive ? <p className='inactiveAnalytics' onClick={handleAnalyticsBarClick}>Global Analytics</p> : <p className='activeAnalytics' onClick={handleAnalyticsBarClick}>Global Analytics</p> }
    </div>
  )
}

export default Analytics
