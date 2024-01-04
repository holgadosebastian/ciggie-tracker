import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Tabs } from './Tabs';
import { Calendar } from './Calendar';
import { Container, Text, Icon } from '../../components';
import MainContext from '../../context/MainContext';

const Habit = () => {
  const { currentTab, setCurrentTab } = useContext(MainContext);
  const [currentView, setCurrentView] = useState('list');
  const { habitId } = useParams();
  useEffect(() => {
    setCurrentTab(habitId);
  }, [habitId]);

  if (currentTab === null || currentTab.id !== habitId) return 'Loading';

  return (
    <div className='h-[calc(100vh-5rem)]' theme={currentTab.themeColor}>
      <Container className='h-full flex flex-col gap-4'>
        <div className='flex justify-between'>
          <Link to='/' className='inline-flex gap-2 items-center'>
            <Icon name='chevron-left' size='xs' />
            <Text as='span' size='base'>
              Back
            </Text>
          </Link>
          <div className='flex'>
            <button
              className={cn(
                'inline-flex gap-1 items-center border border-white p-1 rounded-sm rounded-r-none',
                {
                  'bg-white': currentView === 'list'
                }
              )}
              onClick={() => setCurrentView('list')}
            >
              <Icon
                name='list'
                size='xs'
                color={currentView === 'list' ? 'mono-dark' : 'white'}
              />
              <Text
                size='tiny'
                className='uppercase'
                color={currentView === 'list' ? 'mono-dark' : 'white'}
              >
                Today
              </Text>
            </button>
            <button
              className={cn(
                'inline-flex gap-1 items-center border border-white p-1 rounded-sm rounded-l-none',
                {
                  'bg-white': currentView === 'calendar'
                }
              )}
              onClick={() => setCurrentView('calendar')}
            >
              <Icon
                name='calendar'
                size='xs'
                color={currentView === 'calendar' ? 'mono-dark' : 'white'}
              />
              <Text
                size='tiny'
                className='uppercase'
                color={currentView === 'calendar' ? 'mono-dark' : 'white'}
              >
                Calendar
              </Text>
            </button>
          </div>
        </div>
        <Counter />
        {currentView === 'list' ? <OccurrencesList /> : <Calendar />}
      </Container>
      <Tabs />
    </div>
  );
};

export default Habit;
