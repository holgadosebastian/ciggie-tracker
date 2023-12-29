import React, { useState, useEffect, useContext, useMemo } from 'react';
import cn from 'classnames';

import { Icon, Surface, Button, Text } from '../../components';
import { msToTime } from '../../lib/utils';

import MainContext from '../../context/MainContext';
import { useOccurrences } from '../../hooks/useOccurrences';

import { Settings } from './Settings';

export const Counter = () => {
  const { currentTab, addOcurrence } = useContext(MainContext);
  const { goal, delay } = currentTab;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { todayOccurrencesCount } = useOccurrences();

  return (
    <>
      <div className='flex align-center w-full justify-center items-center'>
        <Surface
          className='flex flex-col justify-center items-center w-full relative border-2 border-dark'
          rounded='md'
          padding='lg'
          color='transparent'
        >
          <Text size='sm' className='uppercase mb-2'>
            {currentTab.name}
          </Text>
          <div className='rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center'>
            <div className='flex items-center justify-center gap-2 relative w-full'>
              <span className='text-5xl font-bold'>
                {todayOccurrencesCount}
              </span>
              {goal > 0 && (
                <span className='text-xl text-dark font-bold'>/ {goal}</span>
              )}
              {delay > 0 && <DelayTimer className='absolute top-full' />}
            </div>
          </div>
          <Button
            variant='secondary'
            className='mt-4'
            onClick={() => addOcurrence()}
          >
            Add
          </Button>

          <Surface
            as='button'
            className='absolute top-4 right-4 h-8 w-8 leading-8'
            rounded='sm'
            background='white'
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name='cog' color='dark' />
          </Surface>
        </Surface>
      </div>
      <Settings isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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

  return (
    <Text size='small' className={cn('text-xs', className)}>
      {delayText}
    </Text>
  );
};
