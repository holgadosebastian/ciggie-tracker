import React, { useContext, useState } from 'react';

import { Icon, Surface, Button, FormField, Text } from '../../components';
import { COLORS } from '../../lib/const';
import MainContext from '../../context/MainContext';

export const Tabs = () => {
  const { currentTab, setCurrentTab, tabs } = useContext(MainContext);
  const [newTabOpen, setNewTabOpen] = useState(false);

  return (
    <div className='h-12 flex fixed bottom-0 left-0 w-full border-t-dark border-t-2'>
      {tabs.map(({ id, name }) => (
        <Surface
          key={id}
          as='button'
          className='uppercase h-12 px-4 leading-10 text-xs flex flex-col gap-1 items-center justify-center'
          onClick={() => setCurrentTab(id)}
          background={currentTab.id === id ? 'dark' : 'transparent'}
        >
          <Icon name='fire' size='xs' />
          <Text size='tiny'>{name}</Text>
        </Surface>
      ))}
      <button
        className='uppercase h-12 w-12 px-4 leading-12 text-darker ml-auto bg-slate-700'
        onClick={() => setNewTabOpen(true)}
      >
        <Icon name='plus' />
      </button>
      <NewTab isOpen={newTabOpen} onClose={() => setNewTabOpen(false)} />
    </div>
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
    <Surface
      className='absolute bottom-0 w-full'
      padding='md'
      background='dark'
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
        <Button type='submit'>ADD</Button>
      </form>
    </Surface>
  );
};
