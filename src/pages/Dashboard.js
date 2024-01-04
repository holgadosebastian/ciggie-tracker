import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import MainContext from '../context/MainContext';
import {
  Container,
  Surface,
  Text,
  Icon,
  FormField,
  Button,
  Drawer
} from '../components';
import { getStoredTabInfo } from '../lib/utils';
import { COLORS, THEME_ICONS } from '../lib/const';

const Dashboard = () => {
  const { tabs } = useContext(MainContext);
  const [items, setItems] = useState([]);
  const [newHabitOpen, setNewHabitOpen] = useState(false);

  useEffect(() => {
    setItems(tabs.map((tab) => getStoredTabInfo(tab.id)));
  }, [tabs]);

  return (
    <>
      <div className='h-[calc(100vh-6.5rem)]'>
        <Container className='h-full flex flex-col gap-4'>
          <Text size='h4' className='uppercase'>
            Your habits
          </Text>

          {items.map(({ id, name, themeColor, icon, occurrences }) => (
            <HabitItem
              key={id}
              id={id}
              name={name}
              themeColor={themeColor}
              icon={icon}
              occurrences={occurrences}
            />
          ))}

          <Surface
            color='white'
            padding='md'
            rounded='default'
            outline
            onClick={() => setNewHabitOpen(true)}
          >
            <div className='flex gap-5 items-center'>
              <Surface
                className='flex items-center justify-center shrink-0 w-10 h-10'
                rounded='default'
              >
                <Icon name='plus' color='mono-dark' />
              </Surface>
              <div>
                <Text size='h5' className='uppercase'>
                  New Habit
                </Text>
              </div>
            </div>
          </Surface>
        </Container>
      </div>
      <NewHabitModal
        isOpen={newHabitOpen}
        onClose={() => setNewHabitOpen(false)}
      />
    </>
  );
};

const HabitItem = ({ id, name, themeColor, icon, occurrences }) => {
  return (
    <Surface
      as={Link}
      to={`/habit/${id}`}
      theme={themeColor}
      color='gradient'
      padding='md'
      rounded='default'
    >
      <div className='flex gap-5 items-center'>
        <Surface
          className='flex items-center justify-center shrink-0 w-10 h-10'
          rounded='default'
        >
          <Icon name={icon || 'fire'} color='dark' />
        </Surface>
        <div>
          <Text size='h5' className='uppercase'>
            {name}
          </Text>
          <Text size='small'>Today: {occurrences.length}</Text>
        </div>
      </div>
    </Surface>
  );
};

const NewHabitModal = ({ isOpen, onClose }) => {
  const { addTab } = useContext(MainContext);
  const [name, setName] = useState('Item 1');
  const [themeColor, setThemeColor] = useState('sky');
  const [icon, setIcon] = useState('fire');

  const handleSubmit = (event) => {
    event.preventDefault();

    addTab({ name, themeColor, icon });
    onClose();
  };

  return (
    <Drawer title='New Habit' isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        <div className='flex justify-center' theme={themeColor}>
          <Surface
            className='bg-slate-900 w-28 h-28 flex flex-col items-center justify-center gap-2'
            rounded='default'
            color='mono-darker'
          >
            <Surface
              rounded='default'
              color='gradient'
              className='aspect-square flex items-center justify-center w-12 shrink-0'
            >
              <Icon name={icon} size='xl' />
            </Surface>
            <Text className='uppercase leading-none'>{name}</Text>
          </Surface>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <FormField
            label='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
              {Object.values(COLORS).map((value) => {
                const isActive = value === themeColor;

                return (
                  <div theme={value} className='relative' key={value}>
                    {isActive && (
                      <Surface
                        className='absolute top-0 left-0 w-full h-full aspect-square'
                        rounded='default'
                        outline
                      />
                    )}
                    <Surface
                      className='flex items-center justify-center aspect-square'
                      padding='sm'
                      color='gradient'
                      rounded='default'
                      onClick={() => setThemeColor(value)}
                    ></Surface>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
              {Object.values(THEME_ICONS).map((value) => (
                <Surface
                  key={value}
                  className='flex items-center justify-center aspect-square'
                  padding='sm'
                  color='white'
                  rounded='default'
                  outline={value !== icon}
                  onClick={() => setIcon(value)}
                >
                  <Icon
                    name={value}
                    size='xl'
                    color={value !== icon ? 'white' : 'mono-dark'}
                  />
                </Surface>
              ))}
            </div>
          </div>
          <Button type='submit'>ADD</Button>
        </form>
      </Drawer.Body>
    </Drawer>
  );
};

export default Dashboard;
