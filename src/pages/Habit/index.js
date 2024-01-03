import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Tabs } from './Tabs';
import { Container, Text, Icon } from '../../components';
import MainContext from '../../context/MainContext';

const Habit = () => {
  const { currentTab, setCurrentTab } = useContext(MainContext);
  const { habitId } = useParams();

  useEffect(() => {
    setCurrentTab(habitId);
  }, [habitId]);

  if (currentTab === null || currentTab.id !== habitId) return 'Loading';

  return (
    <div className='h-[calc(100vh-6.5rem)]' theme={currentTab.themeColor}>
      <Container className='h-full flex flex-col gap-4'>
        <Link to='/' className='inline-flex gap-2 items-center'>
          <Icon name='chevron-left' size='xs' />
          <Text as='span' size='base'>
            Back
          </Text>
        </Link>
        <Counter />
        <OccurrencesList />
      </Container>
      <Tabs />
    </div>
  );
};

export default Habit;
