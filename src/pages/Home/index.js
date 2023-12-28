import React, { useState, useEffect, useContext, useMemo } from 'react';

import { Counter } from './Counter';
import { OccurrencesList } from './OccurrencesList';
import { Icon, Surface, Button, FormField, Container } from '../../components';
import { getDailyOccurrences } from '../../lib/utils';
import { COLORS } from '../../lib/const';
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

const Tabs = () => {
  const { currentTab, setCurrentTab, tabs } = useContext(MainContext);
  const [newTabOpen, setNewTabOpen] = useState(false);

  return (
    <Surface as='div' className='h-10 flex relative'>
      {tabs.map(({ id, name }) => (
        <Surface
          key={id}
          as='button'
          className='uppercase h-10 px-4 leading-10 text-xs'
          onClick={() => setCurrentTab(id)}
          background={currentTab.id === id ? 'dark' : 'darker'}
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
        <Icon name='plus' />
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
      <button
        className='absolute top-4 right-4'
        type='button'
        onClick={() => onClose()}
      >
        <Icon name='close' />
      </button>

      <p className='text-xl mb-5'>Add a New Tab</p>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          label='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormField
          label='Color'
          name='themeColor'
          type='select'
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        >
          {Object.values(COLORS).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </FormField>
        <Button type='submit'>ADD</Button>
      </form>
    </Surface>
  );
};

export default Home;
