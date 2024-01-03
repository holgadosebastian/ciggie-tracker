import React from 'react';
import { Link } from 'react-router-dom';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Tabs } from './Tabs';
import { Container, Text, Icon } from '../../components';

const Habit = () => {
  return (
    <div className='h-[calc(100vh-6.5rem)]'>
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