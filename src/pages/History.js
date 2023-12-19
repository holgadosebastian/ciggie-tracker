import React, { useState, useEffect, useContext } from 'react';

import { getGroupedPuchits } from '../utils/utils';
import MainContext from '../context/MainContext';

const History = ({ puchits }) => {
  const { cigarettes } = useContext(MainContext);
  const [groupedPuchits, setGroupedPuchits] = useState([]);

  useEffect(() => {
    setGroupedPuchits(getGroupedPuchits(cigarettes));
  }, [puchits]);

  return (
    <div className='pt-12 px-4 pb-4 grid grid-cols-3 gap-4'>
      {Object.keys(groupedPuchits).map((keyName) => {
        const { count } = groupedPuchits[keyName];
        return (
          <div
            key={keyName}
            className='text-center p-2 bg-violet-900 rounded-md'
          >
            <p className='mb-2 text-xs'>{keyName}</p>
            <p className='text-3xl'>
              <span className='inline-block'>{count}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default History;
