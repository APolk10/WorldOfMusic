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

  const handleSortClickDescend = () => {
    let sortedData = reshapedData.slice();
    sortedData = sortedData.sort(sortNumsDescending);
    setReshapedData(sortedData)
  }

  const handleSortClickAscend = () => {
    let sortedData: any[] = reshapedData.slice();
    sortedData = sortedData.sort(sortNumsAscending);
    setReshapedData(sortedData)
  }

  const sortNumsDescending = (a: any[], b: any[]) => {
    return b[1] - a[1];
  }
  const sortNumsAscending = (a: any[], b: any[]) => {
    return a[1] - b[1];
  }

  useEffect(() => {
    formatData();
  }, [])

  return (
    <div>
      <div className='box'>
        <div className='boxHeader'>
          <p>World Data By Clicks</p>
          <div id='sortClicksBtns'>
            <button id='sortClicksBtnDescend' type='button' onClick={handleSortClickDescend}>v</button>
            <button  id='sortClicksBtnAscend' type='button' onClick={handleSortClickAscend}>v</button>
          </div>
        </div>
        <div className='boxData'>
          {reshapedData.map(country => (
            <div className='dataEntry' key={country[0] + 'entry'}>
              <div className='dataEntryRow'>
                <p>{country[0]}</p>
                <p>Clicks: {country[1]}</p>
              </div>
            </div>))}
        </div>
      </div>
    </div>
  )
}

export default DataBox;
