import React, { useState, useEffect, useContext, useMemo } from 'react';
import cn from 'classnames';

import { Counter } from './Counter';
import { Icon, Surface, Button, FormField } from '../../components';
import { getDailyPuchits, getTimeString } from '../../lib/utils';
import { COLORS } from '../../lib/const';
import MainContext from '../../context/MainContext';

const Home = ({ todayDate }) => {
  const [todayOccurrences, setTodayOccurrences] = useState([]);
  const { currentTab } = useContext(MainContext);
  const { occurrences } = currentTab;

  useEffect(() => {
    setTodayOccurrences(getDailyPuchits(occurrences).reverse());
  }, [occurrences]);

  return (
    <div className='h-[calc(100vh-6.5rem)]'>
      <Counter todayDate={todayDate} todayOccurrences={todayOccurrences} />
      <OccurencesList occurrences={todayOccurrences} />
      <Tabs />
    </div>
  );
};

const OccurencesList = ({ occurrences }) => {
  const [activePuchitId, setActivePuchitId] = useState(null);

  return (
    <div className='h-3/6 overflow-y-auto p-4'>
      <ul className='flex flex-col gap-2'>
        {occurrences.map(({ id, date }) => (
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
          background={currentTab.id === id ? 'light' : 'dark'}
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
