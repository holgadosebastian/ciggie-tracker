import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback
} from 'react';
import cn from 'classnames';

import { Icon, Surface, Button, Text } from '../../components';
import { msToTime } from '../../lib/utils';

import MainContext from '../../context/MainContext';
import { useOccurrences } from '../../hooks/useOccurrences';

import { SettingsDrawer } from './SettingsDrawer';

export const Counter = () => {
  const { currentTab, addOcurrence } = useContext(MainContext);
  const { goal, delay } = currentTab;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { todayOccurrencesCount } = useOccurrences();

  return (
    <>
      <div className='flex align-center w-full justify-center items-center'>
        <Surface
          className='flex flex-col justify-center items-center w-full relative'
          rounded='md'
          padding='md'
          color='mono-darker'
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
            <Icon name='cog' color='mono-dark' />
          </Surface>
        </Surface>
      </div>
      <SettingsDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
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

  const updateDelayText = useCallback(
    (dateNow) => {
      const progressTime = dateNow - lastOccurrenceDate;
      const delayProgress = delay - progressTime;

      if (delayProgress > 0) {
        setDelayText(msToTime(delayProgress));
      } else {
        setDelayText('Ready');
      }
    },
    [lastOccurrenceDate, delay]
  );

  useEffect(() => {
    updateDelayText(Date.now());
    const interval = setInterval(() => {
      updateDelayText(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [occurrences, updateDelayText]);

  return (
    <Text size='small' className={cn('text-xs', className)}>
      {delayText}
    </Text>
  );
};
