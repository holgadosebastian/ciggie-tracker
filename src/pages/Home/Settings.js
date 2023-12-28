import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';

import { FormField, Button, Icon } from '../../components';
import MainContext from '../../context/MainContext';

export const Settings = ({ isOpen, onClose }) => {
  const [updatedSettings, setUpdatedSettings] = useState({
    name: '',
    delay: 0,
    goal: 0
  });
  const { currentTab, updateTab } = useContext(MainContext);

  useEffect(() => {
    setUpdatedSettings({
      name: currentTab.name,
      delay: currentTab.delay,
      goal: currentTab.goal
    });
  }, [currentTab]);

  const handleSettingsUpdate = (event) => {
    setUpdatedSettings((oldSettings) => ({
      ...oldSettings,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateTab(updatedSettings);
  };

  return (
    <div
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'bg-darker',
        'w-full',
        'h-full',
        'transition-all',
        'p-10',
        {
          'opacity-0 pointer-events-none': !isOpen,
          'opacity-1': isOpen
        }
      )}
    >
      <button
        className='absolute top-2 right-2 w-10 h-10'
        onClick={() => onClose()}
      >
        <Icon name='close' />
      </button>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          label='Name'
          name='name'
          value={updatedSettings.name}
          onChange={handleSettingsUpdate}
        />
        <FormField
          label='Goal'
          name='goal'
          value={updatedSettings.goal}
          onChange={handleSettingsUpdate}
        />
        <Button type='submit'>Update</Button>
      </form>
    </div>
  );
};

const DelayUpdate = () => {
  const { delay, setDelay } = useContext(MainContext);
  const [updatedDelay, setUpdatedDelay] = useState([0, 0]);

  const hours = updatedDelay[0];
  const minutes = updatedDelay[1];

  const updateHours = (updatedHours) => {
    setUpdatedDelay([updatedHours, minutes]);
  };

  const updateMinutes = (updatedMinutes) => {
    setUpdatedDelay([hours, updatedMinutes]);
  };

  const delayToMs = () => {
    return (hours * 60 * 60 + minutes * 60) * 1000;
  };

  return (
    <div>
      <p className='mb-2'>Set your delay</p>
      <div className='flex h-10 w-full'>
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='100'
          onChange={(e) => updateHours(parseInt(e.target.value))}
          value={hours}
        />
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='59'
          onChange={(e) => updateMinutes(parseInt(e.target.value))}
          value={minutes}
        />
        <button
          className='bg-white text-violet-700 px-4 uppercase rounded rounded-l-none'
          onClick={() => setDelay(delayToMs())}
        >
          Update
        </button>
      </div>
    </div>
  );
};
