import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';

import { Icon } from '../components';
import { getDailyPuchits, getTimeString } from '../utils/utils';
import MainContext from '../context/MainContext';

const Home = ({ todayDate, activePuchitId, onSetActivePuchit }) => {
  const [todayPuchits, setTodayPuchits] = useState([]);
  const { goal, cigarettes, addCigarette } = useContext(MainContext);

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(cigarettes).reverse());
  }, [cigarettes]);

  return (
    <div className='h-screen'>
      <div className='flex flex-col justify-center items-center h-3/6'>
        <p className='mb-2'>{todayDate}</p>
        <div className='rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center'>
          <div className='flex items-center gap-2'>
            <span className='text-5xl'>{todayPuchits.length}</span>
            {goal > 0 && <span className='text-xl'>/ {goal}</span>}
          </div>
        </div>
        <button
          className='bg-white text-violet-700 px-6 py-2 mt-4 rounded'
          onClick={() => addCigarette()}
        >
          ADD
        </button>
      </div>
      {todayPuchits.length > 0 && (
        <div className='h-3/6 overflow-y-auto p-4'>
          <ul className='flex flex-col gap-2'>
            {todayPuchits.map(({ id, date }) => (
              <CigaretteItem
                id={id}
                key={id}
                date={date}
                activePuchitId={activePuchitId}
                onSetActivePuchit={onSetActivePuchit}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CigaretteItem = ({ id, date, activePuchitId, onSetActivePuchit }) => {
  const { removeCigarette } = useContext(MainContext);

  const handleRemoveCigarette = (event) => {
    event.stopPropagation();
    removeCigarette(id);
  };

  return (
    <li
      onClick={() =>
        activePuchitId !== id ? onSetActivePuchit(id) : onSetActivePuchit(null)
      }
      key={id}
      className={cn(
        'pl-4',
        'pr-2',
        'h-8',
        'transition-colors',
        'flex',
        'justify-between',
        'items-center',
        {
          'bg-violet-900': activePuchitId !== id,
          'bg-white': activePuchitId === id,
          'text-violet-900': activePuchitId === id
        }
      )}
    >
      <p>{getTimeString(date)}</p>
      {activePuchitId === id && (
        <div className='flex'>
          <button
            className='h-8 w-8 text-center leading-8'
            onClick={handleRemoveCigarette}
          >
            <Icon name='trash-alt' />
          </button>
          <div
            className='h-8 w-8 text-center leading-8'
            onClick={() => onSetActivePuchit(null)}
          >
            <Icon name='close' />
          </div>
        </div>
      )}
    </li>
  );
};

export default Home;
