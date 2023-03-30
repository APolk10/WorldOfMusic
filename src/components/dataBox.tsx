import * as React from 'react';
import { useState, useEffect } from 'react';

interface dataBoxProps {
  data: any[],
}
const DataBox: React.FC<dataBoxProps> = ({ data }) => {

  const [reshapedData, setReshapedData] = useState([[]]);

  const formatData = () => {
    let reshapedData: any[] = [];
    data.map(country => {
      let chunk: [] = country.row.replace(/[(")]/g, '').split(',');
      reshapedData.push(chunk);
    })
    setReshapedData(reshapedData)
  }

  const handleSortClick = () => {
    let sortedData: any[] = reshapedData;
    sortedData.sort(sortNums);
    setReshapedData(sortedData)
  }

  const sortNums = (a: any[], b: any[]) => {
    return b[1] - a[1];
  }

  useEffect(() => {
    formatData();
  }, [])

  return (
    <div>
      <div className='box'>
        <div className='boxHeader'>
          <p>World Data By Clicks</p>
          <button  id='sortClicksBtn' type='button' onClick={handleSortClick}>Sort</button>
        </div>
        {reshapedData.map(country => (
          <div className='dataEntry' key={country[0]}>
            <div className='dataEntryRow'>
              <p>{country[0]}</p>
              <p>Clicks: {country[1]}</p>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default DataBox;
