import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';

import { Icon, Surface } from '../components';
import { getDailyPuchits, getTimeString } from '../utils/utils';
import MainContext from '../context/MainContext';

const Home = ({ todayDate }) => {
  const [todayPuchits, setTodayPuchits] = useState([]);
  const { goal, cigarettes, addCigarette } = useContext(MainContext);

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(cigarettes).reverse());
  }, [cigarettes]);

  return (
    <div className='h-screen'>
      <Counter todayDate={todayDate} todayPuchits={todayPuchits} />
      {todayPuchits.length > 0 && <CigarettesList cigarettes={todayPuchits} />}
    </div>
  );
};

const Counter = ({ todayDate, todayPuchits }) => {
  const { goal, addCigarette } = useContext(MainContext);

  return (
    <div className='flex align-center h-3/6 w-full justify-center items-center'>
      <Surface
        className='flex flex-col justify-center items-center w-80 max-w-full'
        rounded='md'
        padding='lg'
      >
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
      </Surface>
    </div>
  );
};

const CigarettesList = ({ cigarettes }) => {
  const [activePuchitId, setActivePuchitId] = useState(null);

  return (
    <div className='h-3/6 overflow-y-auto p-4'>
      <ul className='flex flex-col gap-2'>
        {cigarettes.map(({ id, date }) => (
          <CigaretteItem
            id={id}
            key={id}
            date={date}
            activePuchitId={activePuchitId}
            onSetActivePuchit={setActivePuchitId}
          />
        ))}
      </ul>
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
