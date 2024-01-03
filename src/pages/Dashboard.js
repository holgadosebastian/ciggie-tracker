import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import MainContext from '../context/MainContext';
import {
  Container,
  Surface,
  Text,
  Icon,
  FormField,
  Label,
  Button
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
  const navigate = useNavigate();
  const { setCurrentTab } = useContext(MainContext);

  const handleOpenTab = () => {
    setCurrentTab(id);
    navigate('/habit');
  };

  return (
    <Surface
      theme={themeColor}
      color='gradient'
      padding='md'
      rounded='default'
      onClick={handleOpenTab}
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
  const [themeColor, setThemeColor] = useState('violet');
  const [icon, setIcon] = useState('fire');

  const handleSubmit = (event) => {
    event.preventDefault();

    addTab({ name, themeColor, icon });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Surface
      className='fixed top-0 left-0 w-full h-full'
      padding='md'
      color='mono-dark'
    >
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
        <div className='flex flex-col gap-2'>
          <Label>Icon</Label>
          <div className='grid grid-cols-5 gap-4'>
            {Object.values(THEME_ICONS).map((value) => (
              <Surface
                key={value}
                className='flex items-center justify-center'
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
    </Surface>
  );
};

export default Dashboard;
