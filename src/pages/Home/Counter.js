import React, { useState, useEffect, useContext, useMemo } from 'react';
import cn from 'classnames';

import { Icon, Surface, Button, FormField } from '../../components';
import { msToTime } from '../../lib/utils';

import MainContext from '../../context/MainContext';

export const Counter = ({ todayDate, todayOccurrences }) => {
  const { currentTab, addOcurrence } = useContext(MainContext);
  const { goal } = currentTab;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className='flex align-center h-3/6 w-full justify-center items-center'>
        <Surface
          className='flex flex-col justify-center items-center w-80 max-w-full relative'
          rounded='md'
          padding='lg'
        >
          <p className='mb-2'>{todayDate}</p>
          <div className='rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center'>
            <div className='flex items-center justify-center gap-2 relative w-full'>
              <span className='text-5xl'>{todayOccurrences.length}</span>
              {goal > 0 && <span className='text-xl'>/ {goal}</span>}

              <DelayTimer className='absolute top-full' />
            </div>
          </div>
          <Button className='mt-4' onClick={() => addOcurrence()}>
            ADD
          </Button>

          <Surface
            as='button'
            className='absolute top-4 right-4 h-8 w-8 leading-8'
            rounded='sm'
            background='white'
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name='cog' className='text-darker' />
          </Surface>
        </Surface>
      </div>
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const DelayTimer = ({ className }) => {
  const { currentTab } = useContext(MainContext);
  const { delay, occurrences } = currentTab;
  const [delayText, setDelayText] = useState(null);

  const lastOccurrenceDate = useMemo(() => {
    return occurrences
      .map(({ date }) => date)
      .sort((a, b) => a - b)
      .slice(-1)[0];
  }, [occurrences]);

  const updateDelayText = () => {
    const dateNow = Date.now();
    const progressTime = dateNow - lastOccurrenceDate;
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
  }, [occurrences]);

  return <p className={cn('text-xs', className)}>{delayText}</p>;
};

const MenuDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'bg-darker',
        'w-full',
        'h-full',
        'transition-all',
        {
          'opacity-0 pointer-events-none': !isOpen,
          'opacity-1': isOpen
        }
      )}
    >
      <button
        className='absolute top-2 right-2 w-10 h-10'
        onClick={() => onClose()}
      >
        <Icon name='close' />
      </button>
      <div className='max-w-xs mx-auto py-10'>
        <ul className='flex flex-col gap-4 w-full'>
          <li>
            <GoalUpdate />
          </li>
          <li>
            <DelayUpdate />
          </li>
        </ul>
      </div>
    </div>
  );
};

const GoalUpdate = () => {
  const { currentTab, setGoal } = useContext(MainContext);
  const { goal } = currentTab;
  const [updatedGoal, setUpdatedGoal] = useState(goal || 0);

  return (
    <div>
      <p className='mb-2'>Set your daily goal</p>
      <div className='flex h-10 w-full'>
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='100'
          onChange={(e) => setUpdatedGoal(parseInt(e.target.value))}
          value={updatedGoal}
        />
        <button
          className='bg-white text-violet-700 px-4 uppercase rounded rounded-l-none'
          onClick={() => setGoal(updatedGoal)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

const DelayUpdate = () => {
  const { delay, setDelay } = useContext(MainContext);
  const [updatedDelay, setUpdatedDelay] = useState([0, 0]);

  const hours = updatedDelay[0];
  const minutes = updatedDelay[1];

  const updateHours = (updatedHours) => {
    setUpdatedDelay([updatedHours, minutes]);
  };

  const updateMinutes = (updatedMinutes) => {
    setUpdatedDelay([hours, updatedMinutes]);
  };

  const delayToMs = () => {
    return (hours * 60 * 60 + minutes * 60) * 1000;
  };

  return (
    <div>
      <p className='mb-2'>Set your delay</p>
      <div className='flex h-10 w-full'>
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='100'
          onChange={(e) => updateHours(parseInt(e.target.value))}
          value={hours}
        />
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='59'
          onChange={(e) => updateMinutes(parseInt(e.target.value))}
          value={minutes}
        />
        <button
          className='bg-white text-violet-700 px-4 uppercase rounded rounded-l-none'
          onClick={() => setDelay(delayToMs())}
        >
          Update
        </button>
      </div>
    </div>
  );
};
