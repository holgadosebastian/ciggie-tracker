import React from 'react';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Tabs } from './Tabs';
import { Container } from '../../components';

const Home = () => {
  return (
    <div className='h-[calc(100vh-6.5rem)]'>
      <Container className='h-full flex flex-col gap-4'>
        <Counter />
        <OccurrencesList />
      </Container>
      <Tabs />
    </div>
  );
};

export default Home;
