import React, { useState, useEffect, useContext, useMemo } from 'react';
import cn from 'classnames';

import { Icon, Surface, Button } from '../components';
import { getDailyPuchits, getTimeString, msToTime } from '../lib/utils';
import MainContext from '../context/MainContext';

const Home = ({ todayDate }) => {
  const [todayPuchits, setTodayPuchits] = useState([]);
  const { cigarettes } = useContext(MainContext);

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(cigarettes).reverse());
  }, [cigarettes]);

  return (
    <div className='h-[calc(100vh-6.5rem)]'>
      <Counter todayDate={todayDate} todayPuchits={todayPuchits} />
      <CigarettesList cigarettes={todayPuchits} />
      <Tabs />
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
          <div className='flex items-center justify-center gap-2 relative w-full'>
            <span className='text-5xl'>{todayPuchits.length}</span>
            {goal > 0 && <span className='text-xl'>/ {goal}</span>}

            <DelayTimer className='absolute top-full' />
          </div>
        </div>
        <Button className='mt-4' onClick={() => addCigarette()}>
          ADD
        </Button>
      </Surface>
    </div>
  );
};

const DelayTimer = ({ className }) => {
  const { delay, cigarettes } = useContext(MainContext);
  const [delayText, setDelayText] = useState(null);

  const lastCigarreteDate = useMemo(() => {
    return cigarettes
      .map(({ date }) => date)
      .sort((a, b) => a - b)
      .slice(-1)[0];
  }, [cigarettes]);

  const updateDelayText = () => {
    const dateNow = Date.now();
    const progressTime = dateNow - lastCigarreteDate;
    const delayProgress = delay - progressTime;

    if (delayProgress > 0) {
      setDelayText(msToTime(delayProgress));
    } else {
      setDelayText('Ready');
    }
  };

  useEffect(() => {
    updateDelayText();
    const interval = setInterval(() => {
      updateDelayText();
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCigarreteDate]);

  return <p className={cn('text-xs', className)}>{delayText}</p>;
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
    <Surface
      as='li'
      rounded='sm'
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
          'text-violet-900': activePuchitId === id
        }
      )}
      background={activePuchitId === id ? 'white' : 'dark'}
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
    </Surface>
  );
};

const Tabs = () => {
  const { currentTab, setCurrentTab, tabs, addTab } = useContext(MainContext);
  const [newTabOpen, setNewTabOpen] = useState(false);

  return (
    <Surface as='div' className='h-10 bg-black bg-opacity-20 flex relative'>
      {tabs.map(({ id, name }) => (
        <Surface
          key={id}
          as='button'
          className='uppercase h-10 px-4 leading-10'
          onClick={() => setCurrentTab(id)}
        >
          {name}
        </Surface>
      ))}
      <Surface
        as='button'
        className='uppercase h-10 px-4 leading-10 text-violet-900 ml-auto'
        background='white'
        onClick={() => setNewTabOpen(true)}
      >
        NEW
      </Surface>
      <NewTab isOpen={newTabOpen} onClose={() => setNewTabOpen(false)} />
    </Surface>
  );
};

const NewTab = ({ isOpen, onClose }) => {
  const { addTab } = useContext(MainContext);
  const [name, setName] = useState('Item 1');
  const [themeColor, setThemeColor] = useState('violet');

  const handleSubmit = (event) => {
    event.preventDefault();

    addTab(name, themeColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Surface className='absolute bottom-0 w-full bg-violet-900' padding='md'>
      <button type='button' onClick={() => onClose()}>
        Close
      </button>
      <p>New Tab</p>
      <form onSubmit={handleSubmit}>
        <input
          className='text-black'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='text-black'
          name='themeColor'
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
        <Button type='submit'>ADD</Button>
      </form>
    </Surface>
  );
};

export default Home;
