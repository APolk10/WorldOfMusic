import * as React from 'react';

interface dataBoxProps {
  data: any[]
}
const DataBox: React.FC<dataBoxProps> = (data) => {

  return (
    <div>
      <div className='box'></div>
    </div>
  )
}

export default DataBox;
