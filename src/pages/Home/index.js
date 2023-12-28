import React, { useState, useEffect, useContext, useMemo } from 'react';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Tabs } from './Tabs';
import { Container } from '../../components';
import { getDailyOccurrences } from '../../lib/utils';
import MainContext from '../../context/MainContext';

const Home = ({ todayDate }) => {
  const [todayOccurrences, setTodayOccurrences] = useState([]);
  const { currentTab } = useContext(MainContext);
  const { occurrences } = currentTab;

  useEffect(() => {
    setTodayOccurrences(getDailyOccurrences(occurrences).reverse());
  }, [occurrences]);

  return (
    <div className='h-[calc(100vh-6.5rem)]'>
      <Container className='h-full flex flex-col gap-4'>
        <Counter todayDate={todayDate} todayOccurrences={todayOccurrences} />
        <OccurrencesList occurrences={todayOccurrences} />
      </Container>
      <Tabs />
    </div>
  );
};

export default Home;
