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

  useEffect(() => {
    formatData();
  }, [])

  return (
    <div>
      <div className='box'>
        {reshapedData.map(country => (
          <div className='dataEntry'>
            <div className='dataEntryRow'>
              <p>{country[0]}</p>
              <p>{country[1]}</p>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default DataBox;
